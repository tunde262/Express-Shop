const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
//gridfs
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

// Load Product Model
const Product = require('../../models/Product');
const Category = require('../../models/Category');
const Profile = require('../../models/Profile');
const Store = require('../../models/Store');

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

// @route GET api/categories
// @desc Get Categories
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const categories = await Category.find().populate('store', ['name', 'img_name']);
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route GET api/variants
// @desc Get Categories by user 
// @access Public
router.get('/storeid/:storeId', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const store = await Store.findById(req.params.storeId);
        const categories = await Category.find({ store: store._id }).populate('store', ['name', 'img_name']);

        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/categories
// @desc Get Store's Categories by id
// @access Private
router.get('/store/:id', auth, async (req, res) => {
    try {
        const categories = await Category.find({ store: req.params.id }).populate('store', ['name', 'img_name']);

        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

//@route GET /:id
//@desc Get single category 
router.get('/:id', auth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('store', ['name', 'img_name']);

        if(!category) {
            return res.status(404).json({ msg: 'Category not found'})
        }

        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    Category.findById(req.params.id)
        .then(category => {
            res.json(category);
        })
        .catch(err => res.status(404).json({category: 'This Category was never added'}));
});

// @route POST api/categories
// @desc Create A Category
// @access Private
router.post('/add/:storeId', upload.single('file'), [ auth, [ 
        check('name', 'Name is required').not().isEmpty(),
    ]], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            tags,
            visibility
        } = req.body;

        // Get fields
        const categoryFields = {};
        if(name) categoryFields.name = name;
        if(visibility) categoryFields.visibility = visibility;
        if(req.file) categoryFields.img = req.file.id;
        if(req.file) categoryFields.img_name = req.file.filename;
        if(tags) {
            categoryFields.tags = tags.split(',').map(tag => tag.trim()); //trim makes sure theres no spaces
        }

        try {
            categoryFields.store = req.params.storeId;
            
            // Create
            const newCategory = new Category(categoryFields);
        
            await newCategory.save();
            res.json(newCategory);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route POST api/categories/:id
// @desc Edit Category
// @access Private
router.post('/edit/:id/:storeId', upload.single('file'), [ auth, [
    check('name', 'Name is required').not().isEmpty()
    ]], async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const {
            name,
            tags,
            visibility
        } = req.body;

        // Get fields
        const categoryFields = {};
        if(name) categoryFields.name = name;
        if(visibility) categoryFields.visibility = visibility;
        if(req.file) categoryFields.img = req.file.id;
        if(req.file) categoryFields.img_name = req.file.filename;
        if(tags) {
            categoryFields.tags = tags.split(',').map(tag => tag.trim()); //trim makes sure theres no spaces
        }

        try {
            // const profile = await Profile.findOne({ user: req.user.id });
            // const store = await Store.findOne({ profile: profile.id });
            categoryFields.store = req.params.storeId;

            let category = await Category.findById(req.params.id );

            if(!category) {
                return res.status(404).json({ msg: 'category not found' });
            }

            // Update
            category = await Category.findOneAndUpdate(
                { _id: req.params.id }, 
                { $set: categoryFields }, 
                { new: true }
            );

            return res.json(category);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route DELETE api/categories/:category_id
// @desc Delete category
router.delete('/:id', auth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if(!category) {
            return res.status(404).json({msg: 'Category not found'});
        }

        await category.remove();
        res.json({ msg: 'Category Deleted'})
    } catch (err) {
        console.error(err.message);
        if(err.name == 'CastError') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route PUT api/products/like/:id
// @desc Add & Remove New Item to Category products
// @access Private
router.put('/product/:catId/:prodId', auth, async (req, res) => {
    console.log('CONSOLE COLLECTION')
    console.log(mongoose.Types.ObjectId(req.params.prodId));
    try {
        const tempId = mongoose.Types.ObjectId(req.params.prodId)
        const prodId = {tempId};
        const category = await Category.findById(req.params.catId);

        console.log('CONSOLE 1');
        // Check if product already in category
        if(category.items.length > 0) {
            console.log('CONSOLE 2');
            if(category.items.filter(itemId => itemId.toString() === req.params.prodId).length > 0) {
                console.log('CONSOLE 3');
                // Get remove index
                const removeIndex = category.items.map(itemId => itemId.toString()).indexOf(req.params.prodId);
                console.log('CONSOLE 4');
    
                category.items.splice(removeIndex, 1);
            } else {
                console.log('CONSOLE 5');
                category.items.unshift({item: req.params.prodId});
            }
        } else {
            console.log('CONSOLE 6');
            category.items.unshift({item: req.params.prodId});
        }
        console.log('CONSOLE 7');

        await category.save();

        res.json(category.items);
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Server Error'); 
    }
});

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

