const mongoose =require('mongoose');
const schema = mongoose.Schema;
const salonSchema = new schema({
    name:{ type:String, required:true}, 
    city:{ type:String, required:true}, 
    gender:{ type:String, required:true}, 
    thumb:{type:Array,required:true},  
    rating:{type:Number,required:true}, 
    models:{type:Array,required:true},
    services:{type:Array, required:true},
    locality:{ type:String, required:true},
    locationId:{type:Number,required:true},
    cityId :{type:Number,required:true},
    min_price:{type:Number, required:true},
    phone:{type:String,required:true}
});
module.exports = mongoose.model("Salons",salonSchema,"Salons");
