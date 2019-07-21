const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
//gridfs
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

// Load Product Model
const Product = require('../../models/Product');
// Load Cart Model
const Cart = require('../../models/Cart');

//Db Config
const db = require('../../config/keys').mongoURI;

// Create Mongo Connection
const conn = mongoose.createConnection(db);

// Init gfs
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('images');
})

// Create Storage engine
const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'images'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

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
router.post('/', upload.single('file'), (req, res) => {
    console.log(req.file)

    // Get fields
    const productFields = {};
    if(req.body.title) productFields.title = req.body.title;
    if(req.file.id) productFields.img = req.file.id;
    if(req.file.filename) productFields.img_name = req.file.filename;
    if(req.body.price) productFields.price = req.body.price;
    if(req.body.qty) productFields.qty = req.body.qty;
    if(req.body.color) productFields.color = req.body.color;
    if(req.body.size) productFields.size = req.body.size;
    if(req.body.company) productFields.company = req.body.company;
    if(req.body.info) productFields.info = req.body.info;
    if(req.body.locations) productFields.locations = req.body.locations;
    if(req.body.category) productFields.category = req.body.category;
    if(req.body.featured) productFields.featured = req.body.featured;
    // Tags - Split into array
    if(typeof req.body.tags !== 'undefined') {
        productFields.tags = req.body.tags.split(',');
    }
    
    new Product(productFields).save().then(product => res.json(product));
});

// @route DELETE api/products/:prod_id
// @desc Delete product 
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

//@route GET /files
//@desc Display all image files in JSON
router.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if(!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        //Files exist
        return res.json(files);
    });
});

//@route GET /files/:filename
//@desc Display single image object
router.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        //File exists
        return res.json(file);
    });
});

//@route GET /image/:filename
//@desc Display Image
router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        
        //Check if image
        if(file.contentType === 'image/jpeg' || file.contentType === 'img/png' || file.contentType === 'image/png') {
            //  Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
});

//@route DELETE /files/:id
//@desc Delete image
router.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id }, (err) => {
        if (err) {
            return res.status(500).json({ success: false })
        }
        return res.json({ success: true });
    });
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

