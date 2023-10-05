const mongoose = require ('mongoose')

const carsSchema = mongoose.Schema( {
        
    date : String,
    marque :{ type:String},
    model :String,
    puissanceF :String,
    carburant :{ type:String},
    annee :{ type:Number},
    kilometrage:Number,
    title :{ type:String},
    description :{ type:String},
    prix:{ type:Number},
    phone:{ type:Number},
    image:{ type:[String]},
    valid: Boolean,
    created_at: Date,
    owner:{type:mongoose.Types.ObjectId,
    ref:'User'}
    
})

module.exports = mongoose.model('cars',carsSchema)