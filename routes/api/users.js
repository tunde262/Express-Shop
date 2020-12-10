const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route POST api/users
// @desc Register user
// @access Public
router.post('/', [
    check('first_name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    const { first_name, last_name, email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ errors: [{ msg: 'This email already exists' }] });
        }

        user = new User({
            first_name,
            last_name, 
            email,
            password
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
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

// @route POST api/users
// @desc Register user
// @access Public
router.post('/:id', async (req, res) => {

    const { first_name, last_name, password } = req.body;

    // Build user object
    const userFields = {};
    if(first_name) userFields.first_name = first_name;
    if(last_name) userFields.last_name = last_name;
    if(password) userFields.password = password;

    try {
        console.log('ID')
        console.log(req.params.id)
        // See if user exists
        let user = await User.findById(req.params.id);

        console.log(user);

        if(!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update
        user = await User.findOneAndUpdate(
            { _id: req.params.id }, 
            { $set: userFields }, 
            { new: true }
        );

        if(password) {
            // Encrypt password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();
        }

        const safeUser = await User.findById(user.id).select('-password');

        return res.json(safeUser);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }

});

// @route POST api/users
// @desc Register user
// @access Public
router.post('/email/:id', async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    const { email} = req.body;

    // Build user object
    const userFields = {};
    if(email) userFields.email = email;

    try {
        // See if user exists
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ errors: [{ msg: 'This email already exists' }] });
        }

        // Update
        user = await User.findOneAndUpdate(
            { _id: req.params.id }, 
            { $set: userFields }, 
            { new: true }
        );

        return res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }

});

module.exports = router;