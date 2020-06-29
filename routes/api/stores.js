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
const Store = require('../../models/Store');
const Profile = require('../../models/Profile');
const Product = require('../../models/Product');
const Variant = require('../../models/Variant');
const User = require('../../models/User');
const Darkstore = require('../../models/Darkstore');
const Category = require('../../models/Category');

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

// @route GET api/stores
// @desc Get Stores
// @access Public
router.get('/', async (req, res) => {
    try {
        const stores = await Store.find();

        res.json(stores);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/profile/me
// @desc Ge current user's store
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        let store = await Store.findOne({ profile: profile.id });

        if(!store) {
            return res.status(400).json({ msg: 'There is no store for this user' });
        }

        res.json(store);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');   
    }
});

//@route GET /:id
//@desc Get single store by id
router.get('/:id', async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);

        if(!store) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        res.json(store);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route POST api/stores
// @desc Create or update Store
// @access Private
router.post('/', upload.single('file'), [ auth, [
        check('name', 'Name is required').not().isEmpty()
    ]], async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const {
            name, 
            description,
            tags,
            youtube,
            instagram,
            facebook,
            twitter,
            website
        } = req.body;

        // Get fields
        const storeFields = {};
        if(name) storeFields.name = name;
        if(req.file) storeFields.img = req.file.id;
        if(req.file) storeFields.img_name = req.file.filename;
        if(description) storeFields.description = description;
        
        // Tags - Split into array
        if(tags) {
            storeFields.tags = tags.split(',').map(tag => tag.trim());
        }

        // Build variant array
        storeFields.social = {};
        if(youtube) storeFields.social.youtube = youtube;
        if(instagram) storeFields.social.instagram = instagram;
        if(facebook) storeFields.social.facebook = facebook;
        if(twitter) storeFields.social.twitter = twitter;
        if(website) storeFields.social.website = website;
        
        try {
            const profile = await Profile.findOne({ user: req.user.id });

            storeFields.profile = profile.id;

            let store = await Store.findOne({ profile: profile.id });

            if(store) {
                // Update
                store = await Store.findOneAndUpdate(
                    { profile: profile.id }, 
                    { $set: storeFields }, 
                    { new: true }
                );

                return res.json(store);
            }
            
            // Create
            const newStore = new Store(storeFields);
        
            await newStore.save();
            res.json(newStore);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route DELETE api/stores/:id
// @desc Delete store and all it's data except order history
router.delete('/:id', auth, async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);

        if(!store) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        // Remove all of store's product variants
        await Variant.deleteMany({store: req.params.id});
        // Remove all of store's products
        await Product.deleteMany({store: req.params.id});
        // Remove store's darkstore locations
        await Darkstore.deleteMany({store: req.params.id});
        // Remove store's categories
        await Category.deleteMany({store: req.params.id});
        // Remove store
        await store.remove();

        // TODO
        // verify user
        // if(product.store.toString() !== req.params.store_id) {
        //     return res.status(401).json({ msg: 'User not authorized' });
        // }

        res.json({ msg: 'Store removed' });
    } catch (err) {
        console.error(err.message);
        if(err.name == 'CastError') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
});

// ---- Interactions -----

// @route PUT api/stores/favorite/:id
// @desc Favorite a Store
// @access Private
router.put('/favorite/:id', auth, async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);

        // Check if store already favorited by same user
        if(store.favorites.filter(favorite => favorite.user.toString() === req.user.id).length > 0) {
            // Get remove index
            const removeIndex = store.favorites.map(favorite => favorite.user.toString()).indexOf(req.user.id);

            store.favorites.splice(removeIndex, 1);
        } else {
            store.favorites.unshift({ user: req.user.id });
        }

        await store.save();

        res.json(store.favorites);
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Server Error'); 
    }
})

// @route POST api/stores/review/:id
// @desc Add review on a store
// @access Private
router.post('/review/:id', [ auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select('-password');
    const store = await Store.findById(req.params.id);

    try {
        const newReview = {
            text: req.body.text,
            name: user.name,
            user: req.user.id
        };

        store.reviews.unshift(newReview);
        await store.save()

        res.json(store.reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route DELETE api/stores/review/:id/:review_id
// @desc Remove review on a store
// @access Private
router.delete('/review/:id/:review_id', auth, async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);

        // Pull out review
        const review = store.reviews.find(review => review.id === req.params.review_id); // Will return review or 'false'

        // Make sure review exists
        if(!review) {
            return res.status(404).json({ msg: 'Review does not exist' });
        }

        // Check user is creator of post
        if(review.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized'})
        }

        // Get remove index
        const removeIndex = store.reviews.map(review => review.id.toString()).indexOf(review.id);

        store.reviews.splice(removeIndex, 1);

        await store.save();

        res.json(store.reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
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

