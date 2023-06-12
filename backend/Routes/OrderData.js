const express = require('express');
const router = express.Router();
const Order = require("../models/Orders");

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })

    // if email not existing in db (it's the first order from that ID) then create:  else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId);
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                // the below $push... line will append the current order to the previous orders of the particular user. 
                // $push is important for appending the current data otherwise it will update the entire data of current user to the current order rather than appending it. 
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            res.send("Server Error", error.message)
        }
    }
})

router.post("/orderHistory", async (req, res) => {

    try {
        let myData = Order.findOne({ "email": req.body.email });
        res.json({myData})
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;