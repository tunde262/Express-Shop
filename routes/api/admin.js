const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const Order = require('../../models/Order');
const Cart = require('../../models/Cart');

router.get('/orders', (req, res) => {
    Order.find()
        .then(orders => {
            orders.forEach((order) => {
                const cart = new Cart(order.cart);
                order.items = cart.generateArray();
            });
            res.json(orders);
        })
        .catch(err => res.status(404).json(err));
});

router.get('/:profile', (req, res) => {
    Order.find({ user: req.params.profile })
        .then(orders => {
            orders.forEach((order) => {
                const cart = new Cart(order.cart);
                order.items = cart.generateArray();
            });
            res.json(orders);
        })
        .catch(err => res.status(404).json(err));
});



module.exports = router;

