const mongoose = require('mongoose');
const schema = mongoose.Schema;
const salonSchema = new schema({
    userId: {
        type: String,
        required: true
    },
    salonId: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
   
    userName: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    orderDetails: {
        type: Array,
        required: true
    },
    payment:{
        type:String,required:true
    },
    confirmBooking:{
        type:String,required:true
    },
    mobile:{type:String, required: true}
});
module.exports = mongoose.model("Orders", salonSchema, "Orders");
