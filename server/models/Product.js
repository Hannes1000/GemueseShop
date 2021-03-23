const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    name: {
        type:String,
        maxlength:100
    },
    type: {
        type:String,
        maxlength:100
    },
    description: {
        type:String,
    },
    available: {
        type:Boolean,
    },
    images:{
        type: Array,
        default:[]
    },
    soldNumber:{
        type: Number,
        default: 0
    },
    soldKg:{
        type: Number,
        default:0
    },
    price:{
        type: Number,
        default: 0
    }
}, {timestamps: true})



const Product = mongoose.model('Product', productSchema);

module.exports = { Product }