const express = require('express');
const router = express.Router();
const { Order } = require("../models/Order");

const { auth } = require("../middleware/auth");

router.post("/uploadOrder", auth, (req, res) => {
    console.log("sadflf")
    console.log(req.body)
    //save the data from the add Product form in Database
    const order = new Order(req.body)
    order.save((err) =>{
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true, order: order._id})
    })
});


module.exports = router;
