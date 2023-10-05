const Cars = require('../Models/Cars')

exports.getAllCar = async (req,res)=>{
    try {
        const cars = await Cars.find()
        res.status(200).send(cars)

    } catch (error) {
        res.status(500).send('could not get cars')
    }
}
 
exports.getCars = async (req,res)=>{
    try {
        const car = await Cars.findById(req.params.id)
        res.status(200).send(car)


    } catch (error) {
        res.status(500).send('could not get cars')
    }
}