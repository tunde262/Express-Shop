const express = require('express');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const path = require('path');

const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const stripe = require('./routes/api/stripe');
const products = require('./routes/api/products');
const admin = require('./routes/api/admin');
const categories = require('./routes/api/categories');
const customers = require('./routes/api/customers');
const darkstores = require('./routes/api/darkstores');
const orders = require('./routes/api/orders');
const profile = require('./routes/api/profile');
const stores = require('./routes/api/stores');
const variants = require('./routes/api/variants');

const app = express();

connectDB();

// Body parser middleware
app.use(express.json({ extended: false }));

app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret', 
    resave: false, 
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 } // 3 hours
}));

// Use Routes
app.use('/api/auth', auth);
app.use('/api/stripe', stripe);
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/admin', admin);
app.use('/api/categories', categories);
app.use('/api/customers', customers);
app.use('/api/darkstores', darkstores);
app.use('/api/orders', orders);
app.use('/api/profile', profile);
app.use('/api/stores', stores);
app.use('/api/variants', variants);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));