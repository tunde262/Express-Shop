const express = require('express');
const router = express.Router();
const stripeLoader = require('stripe');
const config = require('config');
const stripe = require('stripe')(config.get('stripeSecretKey'));
const auth = require('../../middleware/auth');

const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Store = require('../../models/Store');

router.get('/test', (req, res) => {
    res.json(req.user);
});

router.post('/create-account-hosted', auth, async (req, res) => {

    console.log('code: ' + req.body.code)
    
    try {

        // Assert the state matches the state you provided in the OAuth link (optional).
        // if(!stateMatches(req.body.state)) {
        //     return res.status(403).json({ error: 'Incorrect state parameter: ' + state });
        // }
        
        const response = await stripe.oauth.token({
            grant_type: 'authorization_code',
            code: req.body.code,
        });
          
        var connected_account_id = response.stripe_user_id;
        saveAccountId(connected_account_id);
        res.json(connected_account_id);
    } catch (err) {
        console.log(err);
        if (err.type === 'StripeInvalidGrantError') {
            return res.status(400).json({error: 'Invalid authorization code: ' + code});
        } else {
            return res.status(500).json({error: 'An unknown error occurred.'});
        }
    }
});

const stateMatches = (state_parameter) => {
    // Load the same state value that you randomly generated for your OAuth link.
    const saved_state = 'SECRET';
  
    return saved_state == state_parameter;
}
  
// Add connect account ID to store.stripe_id
const saveAccountId = async (id) => {
    // Save the connected account ID from the response to database.
    console.log('Connected account ID: ' + id);
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const store = await Store.findOne({ profile: profile.id });
        productFields.store = store.id;
        // Update
        product = await store.updateOne(
            { _id: store.id }, 
            { $set: {stripe_id: `${id}`} }, 
            { new: true }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Create on-demand link To View Dashboard
router.post('/create-login-link', auth, async (req, res) => {

    console.log('acct id code: ' + req.body.code)
    
    try {
        const link = await stripe.accounts.createLoginLink(req.body.code);
        console.log(link);

        res.json(link);
    } catch (err) {
        console.log(err);
        res.status(400).send('Servor Error');
    }
});

router.get('/clear', (req, res) => {
    req.session.cart = null;
    res.json(req.session.cart);
});

router.post('/donate', async (req, res, next) => {
    const amount = req.body.amount;
    const session = req.body.session;
    const cart = new Cart(req.session.cart);

    try {
        console.log('CART: ' + cart)
        const paymentIntent = await stripe.paymentIntents.create({
            payment_method_types: ['card'],
            amount: amount * 100,
            currency: 'usd',
            application_fee_amount: 123,
            transfer_data: {
              destination: req.body.store,
            },
        });
        res.json({client_secret: paymentIntent.client_secret});
        console.log('Sent: ' + paymentIntent.client_secret)
        const order = new Order({
            user: req.body.user,
            stores: req.body.stores,
            cart: cart,
            address: req.body.address,
            telephone: req.body.telephone,
            name: req.body.name,
            paymentId: paymentIntent.id
        });
        await order.save();
        console.log('Order: ' + order);
        // const customer = await stripe.customers.create({
        //     email: req.body.email,
        //     source: req.body.token.id
        // });

        // console.log('Customer: ' + customer);

        // const charge = await stripe.charges.create({
        //     amount: amount * 100,
        //     description: 'Cardboard Express',
        //     currency: 'usd',
        //     customer: customer.id,
        //     application_fee_amount: 123,
        //     transfer_data: {
        //       destination: req.body.store,
        //     },
        // });

        // console.log('Charge: ' + charge);

        // const order = new Order({
        //     user: req.body.user,
        //     cart: cart,
        //     address: req.body.address,
        //     telephone: req.body.telephone,
        //     name: req.body.name,
        //     paymentId: charge.id
        // });
        // await order.save();
        // console.log('Order: ' + order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;