const express = require('express');
const router = express.Router();
const stripeLoader = require('stripe');
const keys = require('../../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

const Order = require('../../models/Order');
const Cart = require('../../models/Cart');

router.get('/test', (req, res) => {
    res.json(req.user);
});
router.get('/clear', (req, res) => {
    req.session.cart = null;
    res.json(req.session.cart);
});

router.post('/donate', async (req, res, next) => {
    const amount = req.body.amount;
    const session = req.body.session;
    const cart = new Cart(req.session.cart);

    stripe.customers.create({
        email: req.body.email,
        source: req.body.token.id
    })
    .then(customer => stripe.charges.create({
        amount: amount * 100,
        description: 'Cardboard Shop Test',
        currency: 'usd',
        customer: customer.id
    }))
    .then(charge => {
        const order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save();
    });
});

module.exports = router;