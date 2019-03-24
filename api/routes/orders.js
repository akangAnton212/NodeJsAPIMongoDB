const express = require('express');
const router = express.Router();

router.get('/', (req, res,  next) => {
    res.status(200).json({
        message: 'Hanling All Orders'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        qty: req.body.qty
    };
    res.status(200).json({
        message: 'Hanling POST Orders',
        order:order
    });
});

router.get('/:orderID', (req, res, next) => {
    res.status(200).json({
        message: 'Orderan detail',
        orderDetail : req.params.orderID
    });
});

module.exports = router;