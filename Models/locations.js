const mongoose =require('mongoose');
const schema = mongoose.Schema;
const locationSchema = new schema({
    name:{ type:String, required:true},
    cityId:{ type:Number, required:true}, 
    locationId:{ type:Number, required:true}, 
    city:{ type:String, required:true}, 
    cuntryName:{ type:String, required:true}

})
module.exports = mongoose.model("Location",locationSchema,"Location" );