const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

//gridfs
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');

// Load Models
const Product = require('../../models/Product');
const Variant = require('../../models/Variant');
const Cart = require('../../models/Cart');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Store = require('../../models/Store');

//Db Config
const config = require('config');
const { listIndexes } = require('../../models/Product');
const db = config.get('mongoURI');

// Create Mongo Connection
const conn = mongoose.createConnection(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

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
    options: { useNewUrlParser: true, useUnifiedTopology: true },
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
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('store', ['name', 'img_name']);

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/products
// @desc Get Products by user 
// @access Public
router.get('/store', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const store = await Store.findOne({ profile: profile.id });
        const products = await Product.find({ store: store.id }).populate('store', ['name', 'img_name']);

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/products
// @desc Get Products by store ID
// @access Public
router.get('/store/:id', async (req, res) => {
    try {
        const products = await Product.find({ store: req.params.id }).populate('store', ['name', 'img_name']);

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

//@route GET /:id
//@desc Get single product by id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('store', ['name', 'img_name']);

        if(!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/products
// @desc Get Product by category
// @access Public
router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category }).populate('store', ['name', 'img_name']);

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route POST api/products
// @desc Create A Product
// @access Public
router.post('/', upload.array("file", 10),[ auth, [
        check('name', 'Name is required').not().isEmpty()
    ]], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }


        const {
            name,
            category,
            price,
            sale_price,
            inventory_qty,
            tags, 
            description,
            sku,
            website_link,
            visible,
            in_stock,
            condition
        } = req.body;

        // Get fields
        const productFields = {};
        if(name) productFields.name = name;
        if(price) productFields.price = price;
        if(sale_price) productFields.sale_price = sale_price;
        if(inventory_qty) productFields.inventory_qty = inventory_qty;
        if(description) productFields.description = description;
        if(sku) productFields.sku = sku;
        if(category) productFields.category = category;
        if(website_link) productFields.website_link = website_link;
        if(visible) productFields.visible = visible;
        if(in_stock) productFields.in_stock = in_stock;
        if(condition) productFields.condition = condition;

        // Imgs
        productFields.img_gallery = [];
        for (var i = 0; i < req.files.length; i++) {
            if(req.files[i]) {
                productFields.img_gallery.push({
                    img_id: 'name',
                    img_name: 'file'
                });
            }
        }
        
        // Tags - Split into array
        if(tags) {
            productFields.tags = tags.split(',').map(tag => tag.trim());
        } 
        
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            const store = await Store.findOne({ profile: profile.id });
            productFields.store = store.id;
            
            // Create
            const newProduct = new Product(productFields);
        
            await newProduct.save();
            res.json(newProduct);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route POST api/products
// @desc Edit A Product
// @access Public
router.post('/:id', upload.single('file'),[ auth, [
        check('name', 'Name is required').not().isEmpty()
    ]], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const {
            name,
            category,
            price,
            sales_price,
            inventory_qty,
            tags, 
            description,
            website_link,
            visible,
            in_stock,
            condition
        } = req.body;

        // Get fields
        const productFields = {};
        if(name) productFields.name = name;
        if(req.file) productFields.img = req.file.id;
        if(req.file) productFields.img_name = req.file.filename;
        if(price) productFields.price = price;
        if(sales_price) productFields.sales_price = sales_price;
        if(inventory_qty) productFields.inventory_qty = inventory_qty;
        if(description) productFields.description = description;
        if(category) productFields.category = category;
        if(website_link) productFields.website_link = website_link;
        if(visible) productFields.visible = visible;
        if(in_stock) productFields.in_stock = in_stock;
        if(condition) productFields.condition = condition;
        
        // Tags - Split into array
        if(tags) {
            productFields.tags = tags.split(',').map(tag => tag.trim());
        } 
        
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            const store = await Store.findOne({ profile: profile.id });
            productFields.store = store.id;
            
            let product = await Product.findById(req.params.id);

            if(!product) {
                return res.status(404).json({ msg: 'Product not found' });
            }

            // Update
            product = await Product.findOneAndUpdate(
                { _id: req.params.id }, 
                { $set: productFields }, 
                { new: true }
            );

            return res.json(product);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route DELETE api/products/:prod_id
// @desc Delete product & all its variants
router.delete('/:id', auth, async (req, res) => {
    try {
        // Remove product variants
        await Variant.deleteMany({ product: req.params.id });

        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // TODO
        // if(product.store.toString() !== req.params.store_id) {
        //     return res.status(401).json({ msg: 'User not authorized' });
        // }

        await product.remove();

        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        if(err.name == 'CastError') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
});

// ---- Interactions -----

// @route PUT api/products/like/:id
// @desc Like a Product
// @access Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        // Check if product already liked by same user
        if(product.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            // Get remove index
            const removeIndex = product.likes.map(like => like.user.toString()).indexOf(req.user.id);

            product.likes.splice(removeIndex, 1);
        } else {
            product.likes.unshift({ user: req.user.id });
        }

        await product.save();

        res.json(product.likes);
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Server Error'); 
    }
})

// // @route PUT api/products/unlike/:id
// // @desc Unlike a Product
// // @access Private
// router.put('/unlike/:id', auth, async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);

//         // Check if product has been liked by same user
//         if(product.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
//             return res.status(400).json({ msg: 'Product has not yet been liked'});
//         }

//         // Get remove index
//         const removeIndex = product.likes.map(like => like.user.toString()).indexOf(req.user.id);

//         product.likes.splice(removeIndex, 1);

//         await product.save();

//         res.json(product.likes);
//     } catch (err) {
//         console.error(err.message);
        
//         res.status(500).send('Server Error'); 
//     }
// });

// @route POST api/products/image/:id
// @desc Add img to product
// @access Private
router.post('/image/:id', upload.single('file'), async (req, res) => {

    const product = await Product.findById(req.params.id);

    try {
        const newImg = {
            img_id: req.file.id,
            img_name: req.file.filename
        };

        product.img_gallery.unshift(newImg);
        await product.save()

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route POST api/products/comment/:id
// @desc Comment on a product
// @access Private
router.put('/comment/:id', [ auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select('-password');
    const product = await Product.findById(req.params.id);
    console.log('COMMEN4444')

    try {
        const newComment = {
            text: req.body.text,
            name: user.name,
            user: req.user.id
        };

        console.log('COMMENT')
        console.log(newComment);

        product.comments.unshift(newComment);
        await product.save()

        res.json(product.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route DELETE api/products/comment/:id/:comment_id
// @desc Remove comment on a product
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        // Pull out comment
        const comment = product.comments.find(comment => comment.id === req.params.comment_id); // Will return comment or 'false'

        // Make sure comment exists
        if(!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        // Check user is creator of post
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized'})
        }

        // Get remove index
        const removeIndex = product.comments.map(comment => comment.id.toString()).indexOf(comment.id);

        product.comments.splice(removeIndex, 1);

        await product.save();

        res.json(product.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// ---- Cart -----

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

// ---- GridFs -----

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

module.exports = router;

