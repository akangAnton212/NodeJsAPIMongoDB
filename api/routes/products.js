const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res,  next) => {
   Product.find()
   .exec()
   .then(data => {
       if(data.length > 0) {
        res.status(200).json(data);
       }else{
        res.status(404).json({
            message: "Data Tidak Di Temukan"
        });  
       }
   })
   .catch(err => {
       res.status(500).json({
            message:"Kesalahan Server",
            error: err
       });
   });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
        res.status(200).json({
            message:"Sukses Input Data",
            data: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message:"Kesalahan Server",
            error: err
        });
    });
});

router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id)
    .exec()
    .then(response => {
        console.log(response);
        if(response){
            res.status(200).json(response);
        }else{
            res.status(404).json({
                message: "Data Tidak Di Temukan"
            });  
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(200).json({
            error: err
        });
    });
});

router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID;
    Product.remove({ _id:id })
    .exec()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({
            message:"Kesalahan Server",
            error: err
       });
    });
});

router.post('/ubahData', (req, res, next) => {
    const id = req.body.id
    Product.updateOne({ _id: id },{
        $set: {
            name: req.body.name,
            price: req.body.price
        }
    })
    .exec()
    .then(response => {
        res.status(200).json({
            message:"Sukses Update Data",
            data: response
        });
    })
    .catch(err => {
        res.status(500).json({
            message:"Kesalahan Server",
            error: err
       });
    });
});



module.exports = router;