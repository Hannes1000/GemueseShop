const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require("multer");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


router.post("/uploadImage", auth, (req, res) => {
    //after getting imgage from client save it
    upload(req, res, err =>{
        if(err) return res.json({success: false, err})
        return res.json({success: true, image: res.req.file.path, fileName: res.req.file.filename})
    })
});

router.post("/uploadProduct", auth, (req, res) => {
    //save the data from the add Product form in Database
    const product = new Product(req.body)
    product.save((err) =>{
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true})
    })
});

router.post("/getProduct", (req, res) => {

    let order = req.body.order ? req.body.order : "asc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "type";
    let available = req.body.available; // ? req.body.available : true
    //console.log(req.body.available)

    let findArgs = req.body.available ? {available: {$eq: available}} : {};

    Product.find(findArgs)
        .populate("writer")
        .sort([[sortBy, order]])
        .exec((err, product) =>{
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true, product})
        })
});

router.post("/editProduct/available/:id", (req, res) => {
    //console.log(req.body.availabale)
    //console.log(req.params.id)
    Product.findById(req.params.id)
    .then(product => {
        product.available = req.body.availabale;
        product.save((err) =>{
            if(err) return res.status(400).json({success: false, err})
            return res.status(200).json({success: true})
        })
    })
});

router.post("/getProductByID/:id", auth, (req, res) => {
    //console.log(req.params.id)
    Product.findById(req.params.id)
    .then(product => {
        console.log(product)
        return res.status(200).json({success: true, product})
    })
    .catch(err => res.status(400).json({success: false, err}));
});

router.post("/updateProductByID/:id", auth, (req, res) => {
    //console.log(req.params.id)
    Product.findById(req.params.id)
    .then((err, product) => {
        product.name = req.body.name;
        product.type = req.body.type;
        product.description = req.body.description;
        product.images = req.body.images;
        product.price = req.body.price;

        product.save((err) =>{
            if(err) return res.status(400).json({success: false, err})
            return res.status(200).json({success: true})
        })
    })
});

router.delete("/deleteProduct/:id", (req, res) => {
    Product.findByIdAndDelete(req.params.id)
    .then(() => res.json({success: true}))
    .catch(err => res.status(400).json({success: false, err}));
});


module.exports = router;
