const express = require('express')
const Cars = require('../Models/Cars')
const Controller= require('../Controllers/ControllerCars')

const carsRouter = express.Router()

carsRouter.post('/addCars',(req,res)=>{
    try {
        console.log(req.body)
        const newCars = new Cars(req.body)
        


        newCars.save()

         res.status(200).send({Msg:'Cars added',newCars})   
        
    } catch (error) {
        res.status(500).send('could not add cars')
    }
})

carsRouter.get('/getAll',Controller.getAllCar)


carsRouter.get('/getById/:id',Controller.getCars)

carsRouter.put('/updateCar/:id',async (req,res)=>{
    try {
        
        const car = await Cars.findByIdAndUpdate(req.params.id,{$set : req.body},{new: true})
        res.status(200).send(car)


    } catch (error) {
        res.status(500).send('could not get cars')
    }
})

carsRouter.delete('/deleteCar/:id',async (req,res)=>{
    try {
        const {id} = req.params

        await Cars.findByIdAndDelete(id)

        res.status(200).send({Msg : 'car deleted'})
    } catch (error) {
        res.status(500).send('Could not delete car')
    }
})
carsRouter.get('/getMyCars/:id',async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
    
        const Allposts = await Cars.find({owner : id})
        console.log(Allposts)

        res.status(200).send({ Allposts })
    } catch (error) {
        
        res.status(500).send({ msg: 'Can not get my posts' })

    }
})

carsRouter.post('/getSearchCars',async (req, res) => {
    try {
        const {marque,modele} = req.body
        console.log(marque)
    
        const Allposts = await Cars.find({$or: [{marque : marque},{model:modele}]})
        console.log(Allposts)

        res.status(200).send(Allposts)
    } catch (error) {
        
        res.status(500).send({ msg: 'Can not get my posts' })

    }
})








module.exports = carsRouter