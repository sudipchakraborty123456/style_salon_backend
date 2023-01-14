const order = require('../Models/Orders');
exports.saveOrder = (req, res) => {
    const reqBody = req.body;
    const { userName, orderId, userId, salonId, orderDetails, totalPrice, orderStatus, date, time, payment, confirmBooking, mobile } = reqBody;
    const placeOrderDetails = new order({
        userId: userId,
        salonId: salonId,
        orderStatus: orderStatus,
        orderDetails: orderDetails,
        totalPrice: totalPrice,
        userName: userName,
        orderId: orderId,
        date: date,
        time: time,
        payment: payment,
        confirmBooking: confirmBooking,
         mobile: mobile
    });

    placeOrderDetails.save().then((data) => {
        res.json(data);

    }).catch((err) => {
        res.json({ error: err })
    });
};


exports.getOrder = ((req, res) => {
    const userId = req.params.userId;
    // console.log(city);
    order.find({ userId: userId }).then(data => {
        res.json({ data });
    }).catch(err => {
        res.json({ error: err });
    })
});


exports.getOrderBySalonId = (req, res) => {
    const salonId = req.params.salonId;
    order.find({ salonId: salonId }).then(data => {
        res.json({ data });
    }).catch(err => {
        res.json({ error: err });
    })
}

exports.acceptBooking = (req, res) => {
    const orderId = req.params.orderId;
    order.updateOne(
        { orderId: orderId },
        { "confirmBooking": "Accepted" },
        (err,ress)=>{
            if(err) {
                res.json({
                    error:err
                });
            }else{
                res.json({
                    message:"One document updated!"
                });
            }
            

        }
    )
}

exports.denyBooking = (req, res) => {
    const orderId = req.params.orderId;
    order.updateOne(
        { orderId: orderId },
        { "confirmBooking": "deny" },
        (err,ress)=>{
            if(err) {
                res.json({
                    error:err
                });
            }else{
                res.json({
                    message:"One document updated!"
                });
            }
            

        }
    )
}