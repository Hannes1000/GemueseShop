const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: {
        type: Array,
        default:[]
    },
    menge:{
        type:Array,
        default:[]
    }
}, {timestamps: true})


const Order = mongoose.model('Order', orderSchema);

module.exports = { Order }