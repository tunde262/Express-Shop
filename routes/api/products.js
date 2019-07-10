const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Product Model
const Product = require('../../models/Product');
// Load Cart Model
const Cart = require('../../models/Cart');

// @route GET api/products
// @desc Get Products
// @access Public
router.get('/', (req, res) => {
    Product.find()
        .then(products => {
            res.json(products);
        })
        .catch(err => res.status(404).json(err));
});

router.get('/category/:category', (req, res) => {
    Product.find({ 'category': req.params.category })
        .then(prod => {
            res.json(prod);
        })
        .catch(err => res.status(404).json({prod: 'This is not a category'}));
});

// @route POST api/products
// @desc Create A Product
// @access Public
router.post('/', (req, res) => {
    // Add single product
    const newProduct = new Product({
        title: req.body.title,
        img: req.body.img,
        price: req.body.price,
        company: req.body.company,
        info: req.body.info,
        category: req.body.category,
    });

    newProduct.save();
    res.json(newProduct);
});

// @route DELETE api/products/:prod_id
// @desc Delete product 
// @access Private
router.delete('/:prod_id', (req, res) => {
    Product.findOneAndRemove({ _id: req.params.prod_id })
        .then()
        .catch(err => res.status(404).json('Product not found'));
});

//@route GET /:prod_id
//@desc Get single product 
router.get('/:prod_id', (req, res) => {
    Product.findById(req.params.prod_id)
        .then(prod => {
            res.json(prod);
        })
        .catch(err => res.status(404).json({prod: 'This Product was never added'}));
});

// @desc Add to cart
router.get('/add-to-cart/:id', (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, (err, product) => {
        if(err) throw err;

        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.json(req.session.cart);
    });
});

router.get('/reduce/:id', function(req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.json(req.session.cart);
});
  
router.get('/remove/:id', function(req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.removeItem(productId);
    req.session.cart = cart;
    res.json(req.session.cart);
});

router.get('/cart/all', (req, res) => {
    res.json(req.session.cart);
});

module.exports = router;

