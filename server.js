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
    cookie: { maxAge: 180 * 60 * 1000 }
}));

// Use Routes
app.use('/api/auth', auth);
app.use('/api/stripe', stripe);
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/admin', admin);

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