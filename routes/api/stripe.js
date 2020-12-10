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

    console.log('SUBMITTING ORDER');
    const {
        address_name,
        first_name,
        last_name,
        street_name,
        street_number,
        city,
        country,
        state, 
        postalcode,
        formatted_address,
        area,
        coordinates,
        placeId,
        phone,
        address_2,
        delivery_instructions,
        stores,
        store, 
        user,
        amount, 
    } = req.body;

    const cart = new Cart(req.session.cart);

    try {
        console.log('CART: ' + cart)
        const paymentIntent = await stripe.paymentIntents.create({
            payment_method_types: ['card'],
            amount: amount * 100,
            currency: 'usd',
            application_fee_amount: 123,
            transfer_data: {
              destination: store,
            },
        });


        // Build profile object
        const newOrder = {};
        if(address_name) newOrder.address_name = address_name;
        if(first_name) newOrder.first_name = first_name;
        if(last_name) newOrder.last_name = last_name;
        if(placeId) newOrder.placeId = placeId;
        if(formatted_address) newOrder.formatted_address = formatted_address;
        if(address_2) newOrder.address_2 = address_2;
        if(phone) newOrder.phone = phone;
        if(delivery_instructions) newOrder.delivery_instructions = delivery_instructions;

        // Build location obj
        newOrder.location = {};
        if(coordinates) {
            newOrder.location.coordinates = coordinates.split(',').map(coordinate => coordinate.trim());
        }

        // Build address component obj
        newOrder.address_components = {};
        if(postalcode) newOrder.address_components.postalcode = postalcode;
        if(street_name) newOrder.address_components.street_name = street_name;
        if(street_number) newOrder.address_components.street_number = street_number;
        if(city) newOrder.address_components.city = city;
        if(state) newOrder.address_components.state = state;
        if(country) newOrder.address_components.country = country;
        if(area) newOrder.address_components.area = area;

        if(user) newOrder.user = user;
        if(stores) newOrder.stores = stores;
        newOrder.cart = cart;
        newOrder.paymentId = paymentIntent.id;

        const order = new Order(newOrder);
        
        await order.save();
        console.log('Order: ' + order);

        res.json({client_secret: paymentIntent.client_secret, orderId : order.id});
        console.log('Sent: ' + paymentIntent.client_secret)
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

router.post('/store-checkout', async (req, res, next) => {

    console.log('SUBMITTING STORE ORDER');
    const {
        address_name,
        first_name,
        last_name,
        street_name,
        street_number,
        city,
        country,
        state, 
        postalcode,
        formatted_address,
        area,
        coordinates,
        placeId,
        phone,
        address_2,
        delivery_instructions,
        stores,
        store, 
        user,
        amount, 
        notStoreItems
    } = req.body;

    const notStoreItemsArray = notStoreItems;
    

    try {
        let cart;
    
        cart = new Cart(req.session.cart);

        req.session.reload( async () => {
            if(notStoreItemsArray.length > 0) {
                for (var i = 0; i < notStoreItemsArray.length; i++) {
                    let item = notStoreItemsArray[i];

                    cart.totalQty -= cart.items[item].qty;
                    cart.totalPrice -= cart.items[item].price;
                    delete cart.items[item];
                    
                }
            }

            let subTotal = cart.totalPrice;
            const tempTax = subTotal * 0.1;
            const tax = parseFloat(tempTax.toFixed(2));
            const total = Number(subTotal + tax).toFixed(2);
            const totalQty = cart.totalQty;


            console.log('TOTAL:' + total);
            console.log('CART: ' + cart)
            const paymentIntent = await stripe.paymentIntents.create({
                payment_method_types: ['card'],
                amount: total * 100,
                currency: 'usd',
                application_fee_amount: 123,
                transfer_data: {
                destination: store,
                },
            });


            console.log('BUILD ORDER OBJECT');
            // Build profile object
            const newOrder = {};
            if(address_name) newOrder.address_name = address_name;
            if(first_name) newOrder.first_name = first_name;
            if(last_name) newOrder.last_name = last_name;
            if(placeId) newOrder.placeId = placeId;
            if(formatted_address) newOrder.formatted_address = formatted_address;
            if(address_2) newOrder.address_2 = address_2;
            if(phone) newOrder.phone = phone;
            if(delivery_instructions) newOrder.delivery_instructions = delivery_instructions;

            console.log('GET ORDER COORDS');
            // Build location obj
            newOrder.location = {};
            if(coordinates) {
                newOrder.location.coordinates = coordinates.split(',').map(coordinate => coordinate.trim());
            }

            console.log('BUILD ORDER ADDY COMPONENTS');
            // Build address component obj
            newOrder.address_components = {};
            if(postalcode) newOrder.address_components.postalcode = postalcode;
            if(street_name) newOrder.address_components.street_name = street_name;
            if(street_number) newOrder.address_components.street_number = street_number;
            if(city) newOrder.address_components.city = city;
            if(state) newOrder.address_components.state = state;
            if(country) newOrder.address_components.country = country;
            if(area) newOrder.address_components.area = area;

            if(user) newOrder.user = user;
            if(stores) newOrder.stores = stores;
            newOrder.cart = cart;
            newOrder.paymentId = paymentIntent.id;

            console.log('CREATE NEW ORDER');
            const order = new Order(newOrder);
            
            console.log('SAVE OBJECT ORDER');
            await order.save();
            console.log('Order: ' + order);

            res.json({client_secret: paymentIntent.client_secret, orderId : order.id});
            console.log('Sent: ' + paymentIntent.client_secret)
            console.log('CART HERE')
            console.log(cart);
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;