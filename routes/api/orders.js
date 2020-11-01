const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// Models
const Order = require('../../models/Order');
const Cart = require('../../models/Cart');

router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find();

        orders.forEach((order) => {
            const cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });

        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

//@route GET /:id
//@desc Get single order by id
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if(!order) {
            return res.status(404).json({ msg: 'No order found' });
        }

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// Get orders by Store Id
router.get('/store/:id', auth, async (req, res) => {
    try {
        const orders = await Order.find({stores: {$elemMatch: {store:req.params.id}}});

        orders.forEach((order) => {
            const cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });

        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

router.get('/customer/:id', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.id });

        orders.forEach((order) => {
            const cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });

        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});



module.exports = router;

