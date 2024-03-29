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

// @route GET api/stores
// @desc Get Stores
// @access Public
router.get('/', async (req, res) => {
    try {
        const testLength = await Store.find().sort({ order_value : 1});

        const skip =
        req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

        if(testLength.length > skip) {
            const stores = await Store.find({}, null, { skip, limit: 8 }).sort({ order_value : 1});
        
            res.json(stores);
        } else {
            res.json(testLength);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/profile/me
// @desc Ge current user's store
// @access Private
router.get('/me', auth, async (req, res) => {
    let storesArray = [];
    let newStore;
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        console.log('PROFILE');
        console.log(profile);

        for(var i = 0; i < profile.stores.length; i++) {
            console.log('STORE ID');
            console.log(profile.stores[i].store);
            newStore = await Store.findById(profile.stores[i].store);
            console.log(newStore);
            storesArray.push(newStore);
            console.log('STORESS ARRAY');
            console.log(storesArray);
        }

        console.log('FETCHED STORESSSSSS');
        console.log(storesArray);
    

        // let store = await Store.findOne({ profile: profile.id });

        if(!storesArray.length === 0) {
            return res.status(400).json({ msg: 'There is no store for this user' });
        }

        res.json(storesArray);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');   
    }
});

router.get('/trending', async (req, res) => {
    console.log('FETCHING POPULAR');

    try {
        const skip =
            req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

        const stores = await Store.find({}, null, { skip, limit: 9 }).sort({ view_num : -1})

        // const stores = await store.find();

        res.json(stores);
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


// @route GET api/stores
// @desc Get Stores by Tag Filter
// @access Public
router.get('/filter/:filter', async (req, res) => {
    try {
        const testLength = await Store.find({ tags: req.params.filter });

        const skip =
        req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

        if(testLength.length > skip) {
            const stores = await Store.find({tags: req.params.filter }, null, { skip, limit: 8 })
        
            res.json(stores);
        } else {
            res.json([])
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/stores
// @desc Get Stores by tag Filter without skipping
// @access Public
router.get('/filter/full/:filter', async (req, res) => {
    try {
        const stores = await Store.find({ tags: req.params.filter }).sort({ order_value : 1});

        res.json(stores);
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
            email,
            phone,
            department,
            tags,
            zipcode,
            street_name,
            street_number,
            city,
            country,
            state, 
            postalcode,
            formatted_return_address,
            area,
            coordinates,
            return_placeId,
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
        if(email) storeFields.email = email;
        if(phone) storeFields.phone = phone;
        if(department) storeFields.department = department;
        if(zipcode) storeFields.zipcode = zipcode;
        // return address
        if(return_placeId) storeFields.return_placeId = return_placeId;
        if(area) storeFields.area = area;
        if(coordinates) storeFields.coordinates = coordinates;
        if(formatted_return_address) storeFields.formatted_return_address = formatted_return_address;

        // Build return location obj
        storeFields.return_location = {};
        if(coordinates) {
            storeFields.return_location.coordinates = coordinates.split(',').map(coordinate => coordinate.trim());
        }

        // Build address component obj
        storeFields.return_address = {};
        if(postalcode) storeFields.return_address.postalcode = postalcode;
        if(street_name) storeFields.return_address.street_name = street_name;
        if(street_number) storeFields.return_address.street_number = street_number;
        if(city) storeFields.return_address.city = city;
        if(state) storeFields.return_address.state = state;
        if(country) storeFields.return_address.country = country;
        if(area) storeFields.return_address.area = area;
        
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

        storeFields.profiles = [];
        
        try {
            const profile = await Profile.findOne({ user: req.user.id });

            storeFields.profiles.push({
                profile: profile.id
            });

            // let store = await Store.findOne({ profile: profile.id });

            // if(store) {
            //     // Update
            //     store = await Store.findOneAndUpdate(
            //         { profile: profile.id }, 
            //         { $set: storeFields }, 
            //         { new: true }
            //     );

            //     return res.json(store);
            // }
            
            // Create
            const newStore = new Store(storeFields);
        
            await newStore.save();

            // Update profile
            profile.stores.unshift({ store: newStore._id });

            profile.recent_store = newStore._id;

            await profile.save();
            
            res.json(newStore);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route POST api/stores
// @desc Edit A Store
// @access Public
router.post('/edit/:id/', upload.single('file'),[ auth, [
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
        website,
        show_banner,
        privacy,
        passcode,
        taxes_in_prod,
        delivery_cost_customers
    } = req.body;

    // Get fields
    const storeFields = {};
    if(name) storeFields.name = name;
    if(show_banner) storeFields.show_banner = show_banner;
    if(privacy) storeFields.privacy = privacy;
    if(passcode) storeFields.passcode = passcode;
    if(taxes_in_prod) storeFields.taxes_in_prod = taxes_in_prod;
    if(delivery_cost_customers) storeFields.delivery_cost_customers = delivery_cost_customers;
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
        console.log('EDIT STORE')
        
        let store = await Store.findById(req.params.id);

        if(!store) {
            return res.status(404).json({ msg: 'Store not found' });
        }

        // Update
        store = await Store.findOneAndUpdate(
            { _id: req.params.id }, 
            { $set: storeFields }, 
            { new: true }
        );

        return res.json(store);
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

// @route GET api/stores/subscriptions/:id
// @desc Get stores current user is subscribed too
// @access Private
router.get('/subscriptions/:id', auth, async (req, res) => {
    try {
        const stores = await Store.find({favorites: {$elemMatch: {user:req.params.id}}});

        res.json(stores);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// Update all store's order_value in Bulk in backend
router.post('/refresh', async (req, res) => {
    console.log('REORDERING CONSOLE');
    try {
        const storesArray = await Store.find();
        console.log('STORE COUNT:')
        console.log(storesArray.length);

        let rangeArray = [];

        for(var i = 0; i < storesArray.length; i++) {
            rangeArray.push(i); // create array of availble order_nums to choose from
        }

        console.log('RANGE ARRAY:')
        console.log(rangeArray);

        let tempRange = [...rangeArray];
        
        for(var x = 0; x < storesArray.length; x++) { // update each item in PRODUCT collection
            const lastElement = tempRange.length - 1; // MAX value is 1 less than collection length

            console.log('LAST ELEMENT:')
            console.log(tempRange[lastElement]);
            
            let orderValue

            if( tempRange.length > 1) {
                let min = Math.ceil(tempRange[0]);
                let max = Math.floor(tempRange[lastElement]);
                orderValue = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
                
                for(var i = 0; i < 100; i++) { // if server gets stuck trying to avoid using unavailble index value
                    if(tempRange[orderValue] === undefined) {
                        let min = Math.ceil(tempRange[0]);
                        let max = Math.floor(tempRange[lastElement]);
                        orderValue = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
                    }
                }
                
                if(tempRange[orderValue] === undefined) {
                    orderValue = 0;
                }

            } else {
                orderValue = 0;
            }

            console.log('INDEX VALUE:')
            console.log(orderValue);
            
            console.log('ORDER VALUE:')
            console.log(tempRange[orderValue]);

            const storeFields = {};
            storeFields.order_value = tempRange[orderValue];
            // Update
            const updatedStore = await Store.findOneAndUpdate(
                { _id: storesArray[x]._id }, 
                { $set: storeFields }, 
                { new: true }
            );

           // Get remove index
           const removeIndex = tempRange.indexOf(updatedStore.order_value);
            tempRange.splice(removeIndex, 1);

            console.log('REMOVE INDEX:')
            console.log(removeIndex);

            console.log('NEW RANGE ARRAY:')
            console.log(tempRange);
        }
        
        res.send("DONE");
    } catch (err) {
        console.log(err);
    }


});


// Update initialze view count in document(s)
router.post('/init-views', async (req, res) => {
    console.log('INITIALZING VIEWS');
    try {
        const storesArray = await Store.find();

        for(var x = 0; x < storesArray.length; x++) { 

            const storeFields = {};
            storeFields.view_count = [];
            // Update
            await Store.findOneAndUpdate(
                { _id: storesArray[x].id }, 
                { $set: storeFields }, 
                { new: true }
            );
        }

        res.send('SUCCESS');
    } catch (err) {
        console.log(err);
    }
});

// ---- Interactions -----

// @route PUT api/stores/view/:id
// @desc View a Store
// @access Private
router.put('/view/:id', auth, async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);

        if(store.view_count.length > 0) {
            // Check if store already liked by same user
            if(store.view_count.filter(view => view.user.toString() === req.user.id).length > 0) {
                res.json(store.view_count);
            } else {
                store.view_count.unshift({ user: req.user.id });
            }
        } else {
            store.view_count.unshift({ user: req.user.id });
        }

        await store.save();

        const storeFields = {};
        storeFields.view_num = store.view_count.length;

        await Store.findOneAndUpdate(
            { _id: store.id }, 
            { $set: storeFields }, 
            { new: true }
        );

        res.json(store.view_count);
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Server Error'); 
    }
})

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

        res.json(store);
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

// @route POST api/stores/image/:id
// @desc Add banner img to store
// @access Private
router.post('/bannerImg/:id', upload.single('file'), async (req, res) => {

    console.log('UPDATING BANNER');
    const store = await Store.findById(req.params.id);

    console.log('UPDATING BANNER 2');

    try {
        console.log('UPDATING BANNER 3');
        const newImg = {
            img_id: req.file.id,
            img_name: req.file.filename
        };

        console.log('UPDATING BANNER 3.5');

        store.banner_imgs.unshift(newImg);

        console.log('UPDATING BANNER 3.7');
        console.log(store);

        await store.save();

        console.log('UPDATING BANNER 3.8');

        console.log('Banner Img Added');

        res.json(store);
    } catch (err) {
        console.log('UPDATING BANNER 4');
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route POST api/stores/image/:id
// @desc Change profile img
// @access Private
router.post('/profileImg/:id', upload.single('file'), async (req, res) => {
    console.log('UPDATING PROFILE IMG');

    console.log('UPDATING PROFILE IMG 2');
    try {
        console.log('UPDATING PROFILE IMG 3');

        const storeImg = {
            img: req.file.id,
            img_name: req.file.filename
        };

        console.log('UPDATING PROFILE IMG 3.5');

        // Update
        let store = await Store.findOneAndUpdate(
            { _id: req.params.id }, 
            { $set: storeImg }
        );

        console.log('UPDATING PROFILE IMG 3.7');
        console.log(store);

        console.log('Profile Img Updated');

        res.json(store);
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

