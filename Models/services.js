const mongoose =require('mongoose');
const schema = mongoose.Schema;
const salonSchema = new schema({
   gender:{
       type:String, required :  true
   },
   mainService:{
       type:String, required:true
   },
   mainServiceId:{
       type:Number,required:true
   },
   subServices:{
       type:Array, required:true
   }
});
module.exports = mongoose.model("services",salonSchema,"services");
