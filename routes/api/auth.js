const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Order = require('../../models/Order');

// router.get('/profile', (req, res) => {
//     Order.find({ user: req.user }, (err, orders) => {
//         if (err) {
//             return res.json(err);
//         }
//         let cart;
//         orders.forEach((order) => {
//             cart = new Cart(order.cart);
//             order.items = cart.generateArray();
//         });
//         res.json(orders);
//     });
// });

// @route GET api/auth
// @desc Get user info
// @access Private
router.get('/', auth, async (req, res) => { // adding 'auth' middleware makes route protected
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/auth
// @desc Authenticate user & get token (Login)
// @access Public
router.post('/', [
    check('email', 'Email is required').exists(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    const { email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 }, // 6 minutes
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }

});


module.exports = router;