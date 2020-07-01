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
const Variant = require('../../models/Variant');
const Cart = require('../../models/Cart');
const Store = require('../../models/Store');
const Profile = require('../../models/Profile');
const Darkstore = require('../../models/Darkstore');


//Db Config
const config = require('config');
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

// @route GET api/variants
// @desc Get all Variants
// @access Public
router.get('/', async (req, res) => {
    try {
        const variants = await Variant.find();

        res.json(variants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/variants
// @desc Get Variants by store ID
// @access Public
router.get('/store/:id', async (req, res) => {
    try {
        const variants = await Variant.find({ store: req.params.id });

        res.json(variants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/variants
// @desc Get Variants by product ID
// @access Public
router.get('/product/:id', async (req, res) => {
    try {
        const variants = await Variant.find({ product: req.params.id });

        res.json(variants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

//@route GET /:id
//@desc Get single Variant 
// @access Public
router.get('/:id', async (req, res) => {
    try {
        const variant = Variant.findById(req.params.id);

        if(!variant) {
            return res.status(404).json({ msg: 'Variant not found' });
        }

        res.json(variant)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET /:id
//@desc Get variants by category
// @access Public
router.get('/category/:category', async (req, res) => {
    try {
        const variants = await Variant.find({ category: req.params.category });

        res.json(variants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route POST api/variants
// @desc Create A Variant
// @access Public
router.post('/product/:id', upload.single('file'), [ auth, [
        check('name', 'Name is required').not().isEmpty()
    ]], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const {
            name,
            category,
            tags, 
            sku,
            visible,
            in_stock,
            inventory_qty,
            sale_price,
            price,
            website_link,
            condition,
            color,
            size,
            weight,
            bundle,
            scent,
            fit,
            flavor,
            material,
        } = req.body;

        // Get fields
        const variantFields = {};
        variantFields.product = req.params.id;
        if(name) variantFields.name = name;
        if(category) variantFields.category = category;
        if(visible) variantFields.visible = visible;
        if(sku) variantFields.sku = sku;
        if(in_stock) variantFields.in_stock = in_stock;
        if(price) variantFields.price = price;
        if(sale_price) variantFields.sale_price = sale_price;
        if(inventory_qty) variantFields.inventory_qty = inventory_qty;
        if(website_link) variantFields.website_link = website_link;
        if(condition) variantFields.condition = condition;
        if(color) variantFields.color = color;
        if(size) variantFields.size = size;
        if(weight) variantFields.weight = weight;
        if(bundle) variantFields.bundle = bundle;
        if(scent) variantFields.scent = scent;
        if(fit) variantFields.fit = fit;
        if(flavor) variantFields.flavor = flavor;
        if(material) variantFields.material = material;
        if(req.file) variantFields.img = req.file.id;
        if(req.file) variantFields.img_name = req.file.filename;
        
        // Tags - Split into array
        if(tags) {
            variantFields.tags = tags.split(',').map(tag => tag.trim());
        }
        
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            const store = await Store.findOne({ profile: profile.id });
            variantFields.store = store.id;
            
            // Create
            const newVariant = new Variant(variantFields);
        
            await newVariant.save();
            res.json(newVariant);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route POST api/variants
// @desc Edit A Variant
// @access Public
router.post('/:id', upload.single('file'), [ auth, [
    check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const {
        name,
        category,
        tags, 
        sku,
        visible,
        in_stock,
        inventory_qty,
        sale_price,
        price,
        website_link,
        condition,
        color,
        size,
        weight,
        bundle,
        scent,
        fit,
        flavor,
        material,
    } = req.body;

    // Get fields
    const variantFields = {};
    variantFields.product = req.params.id;
    if(name) variantFields.name = name;
    if(category) variantFields.category = category;
    if(visible) variantFields.visible = visible;
    if(sku) variantFields.sku = sku;
    if(in_stock) variantFields.in_stock = in_stock;
    if(price) variantFields.price = price;
    if(sale_price) variantFields.sale_price = sale_price;
    if(inventory_qty) variantFields.inventory_qty = inventory_qty;
    if(website_link) variantFields.website_link = website_link;
    if(condition) variantFields.condition = condition;
    if(color) variantFields.color = color;
    if(size) variantFields.size = size;
    if(weight) variantFields.weight = weight;
    if(bundle) variantFields.bundle = bundle;
    if(scent) variantFields.scent = scent;
    if(fit) variantFields.fit = fit;
    if(flavor) variantFields.flavor = flavor;
    if(material) variantFields.material = material;
    if(req.file) variantFields.img = req.file.id;
    if(req.file) variantFields.img_name = req.file.filename;
    
    // Tags - Split into array
    if(tags) {
        variantFields.tags = tags.split(',').map(tag => tag.trim());
    }
    
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const store = await Store.findOne({ profile: profile.id });
        variantFields.store = store.id;
        
        let variant = await Variant.findById(req.params.id);

        if(!variant) {
            return res.status(404).json({ msg: 'Variant not found' });
        }

        // Update
        variant = await Variant.findOneAndUpdate(
            { _id: req.params.id }, 
            { $set: variantFields }, 
            { new: true }
        );

        return res.json(variant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

// @route POST api/variants/location/:id
// @desc Add darkstore location to variant
// @access Private
router.post('/location/:id', auth, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 


    const darkstore = await Darkstore.findById(req.body.darkstore)
    const variant = await Variant.findById(req.params.id);

    try {
        const newLocation = {
            price: req.body.price,
            qty: req.body.qty,
            darkstore: darkstore.id
        };

        variant.locations.unshift(newLocation);
        await variant.save()

        res.json(variant.locations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route DELETE api/variants/location/:id/:location_id
// @desc Remove a location from a variant
// @access Private
router.delete('/location/:id/:location_id', auth, async (req, res) => {
    try {
        const variant = await Variant.findById(req.params.id);

        // Pull out location
        const location = variant.locations.find(location => location.id === req.params.location_id); // Will return location or 'false'

        // Make sure location exists
        if(!location) {
            return res.status(404).json({ msg: 'location does not exist' });
        }

        // TODO

        // // Check store is correct store
        // if(location.user.toString() !== req.user.id) {
        //     return res.status(401).json({ msg: 'User not authorized'})
        // }

        // Get remove index
        const removeIndex = variant.locations.map(location => location.id.toString()).indexOf(location.id);

        variant.locations.splice(removeIndex, 1);

        await variant.save();

        res.json(variant.locations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route DELETE api/variants/:id
// @desc Delete Variant 
// @access
router.delete('/:id', auth, async (req, res) => {
    try {
        const variant = await Variant.findById(req.params.id);

        if(!variant) {
            return res.status(404).json({ msg: 'Variant not found' });
        }
        await variant.remove();

        res.json({ msg: 'Variant removed' });
    } catch (err) {
        console.error(err.message);
        if(err.name == 'CastError') {
            return res.status(404).json({ msg: 'Variant not found' });
        }
        res.status(500).send('Server Error');
    }
});

// ---- Interactions -----

// @route PUT api/products/like/:id
// @desc Like a Variant
// @access Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const variant = await Variant.findById(req.params.id);

        // Check if variant already liked by same user
        if(variant.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            // Get remove index
            const removeIndex = variant.likes.map(like => like.user.toString()).indexOf(req.user.id);

            variant.likes.splice(removeIndex, 1);
        } else {
            variant.likes.unshift({ user: req.user.id });
        }

        await variant.save();

        res.json(variant.likes);
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Server Error'); 
    }
})

// @route POST api/pvariants/comment/:id
// @desc Comment on a variant
// @access Private
router.post('/comment/:id', [ auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select('-password');
    const variant = await Variant.findById(req.params.id);

    try {
        const newComment = {
            text: req.body.text,
            name: user.name,
            user: req.user.id
        };

        variant.comments.unshift(newComment);
        await variant.save()

        res.json(variant.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route DELETE api/pvariants/comment/:id/:comment_id
// @desc Remove comment on a variant
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const variant = await Variant.findById(req.params.id);

        // Pull out comment
        const comment = variant.comments.find(comment => comment.id === req.params.comment_id); // Will return comment or 'false'

        // Make sure comment exists
        if(!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        // Check user is creator of post
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized'})
        }

        // Get remove index
        const removeIndex = variant.comments.map(comment => comment.id.toString()).indexOf(comment.id);

        variant.comments.splice(removeIndex, 1);

        await variant.save();

        res.json(variant.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});


// ---- Cart -----

// @desc Add to cart
router.get('/add-to-cart/:id', (req, res, next) => {
    const variantId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Variant.findById(variantId, (err, variant) => {
        if(err) throw err;

        cart.add(variant, variant.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.json(req.session.cart);
    });
});

router.get('/reduce/:id', function(req, res, next) {
    const variantId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.reduceByOne(variantId);
    req.session.cart = cart;
    res.json(req.session.cart);
});
  
router.get('/remove/:id', function(req, res, next) {
    const variantId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.removeItem(variantId);
    req.session.cart = cart;
    res.json(req.session.cart);
});

router.get('/cart/all', (req, res) => {
    res.json(req.session.cart);
});

// ---- GridFS -----

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

