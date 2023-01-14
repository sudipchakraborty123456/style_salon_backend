const mongoose =require('mongoose');
const schema = mongoose.Schema;
const salonSchema = new schema({
   email:{
       type:String,
       required:true
   },
   mobile:{
       type:String,
       required:true,
   },
   pName:{
       type:String,
       required:true
   },
   orderNotifications:{
       type:String,
       required: true
   }
});
module.exports = mongoose.model("salon'sUsers",salonSchema,"salon'sUsers");
