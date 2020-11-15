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

// Load Models
const Product = require('../../models/Product');
const Darkstore = require('../../models/Darkstore');
const Variant = require('../../models/Variant');
const Store = require('../../models/Store');
const Profile = require('../../models/Profile');

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

// @route GET api/darkstores
// @desc Get Darkstores
// @access Public
router.get('/', auth, async (req, res) => {
    try {
    const darkstores = await Darkstore.find().populate('variants', ['name', 'category', '_id', 'img_name']).populate('store', ['name', 'img_name']);
    res.json(darkstores);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route GET api/variants
// @desc Get Darkstores by user 
// @access Public
router.get('/store', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const store = await Store.findOne({ profile: profile.id });
        const darkstores = await Darkstore.find({ store: store.id }).populate('store', ['name', 'img_name']);

        res.json(darkstores);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/darkstores
// @desc Get Store's Darkstore (storage) locations
// @access Private
router.get('/store/:id', auth, async (req, res) => {
    try {
        const darkstores = await Darkstore.find({ store: req.params.id }).populate('store', ['name', 'img_name']);

        res.json(darkstores);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/darkstores/product/:id
// @desc Get Product's locations
// @access Private
router.get('/product/:id', async (req, res) => {
    const locationArray = [];
    let darkstore;
    try {
        const product = await Product.findById(req.params.id);
        const variants = await Variant.find({ product: product.id });

        variants.map(async variant => {
            for(var i = 0; i < variant.locations.length; i++) {
                console.log('Location ID');
                console.log(variant.locations[i].location);
                darkstore = await Darkstore.findById(variant.locations[i].location);
                console.log('NEW DARKSTORE');
                console.log(darkstore);
                locationArray.push(darkstore);
                console.log('LOCATIONS ARRAY');
                console.log(locationArray);
            }
            console.log('EXIT FOR LOOP')
            console.log(locationArray)
        })
       
        console.log('FETCHED LOCATIONSSSSSS');
        console.log(locationArray);

        res.json(locationArray);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

//@route GET /:category_id
//@desc Get single Darkstore 
router.get('/:id', async (req, res) => {
    try {
        const darkstore = await Darkstore.findById(req.params.id).populate('store', ['name', 'img_name']);

        if(!darkstore) {
            return res.status(404).json({ msg: 'Location not found' });
        }

        res.json(darkstore);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/darkstores
// @desc Create A Darkstore
// @access Public
router.post('/add/:storeId', upload.single('file'), [ auth, [
        check('name', 'Name is required').not().isEmpty()
    ]], async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const {
            name,
            tags,
            location_tags,
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
        } = req.body;
        
        console.log('BACKEND DATA')
        console.log(req.body)

        // Get fields. Build darkstore object
        const darkstoreFields = {};
        if(name) darkstoreFields.name = name;
        if(placeId) darkstoreFields.placeId = placeId;
        if(area) darkstoreFields.area = area;
        if(coordinates) darkstoreFields.coordinates = coordinates;
        if(formatted_address) darkstoreFields.formatted_address = formatted_address;
        if(phone) darkstoreFields.phone = phone;
        if(req.file) categoryFields.img = req.file.id;
        if(req.file) categoryFields.img_name = req.file.filename;

        if(tags) {
            darkstoreFields.tags = tags.split(',').map(tag => tag.trim());
        }
        if(location_tags) {
            darkstoreFields.location_tags = location_tags.split(',').map(locationTag => locationTag.trim());
        }


        // Build location obj
        darkstoreFields.location = {};
        if(coordinates) {
            darkstoreFields.location.coordinates = coordinates.split(',').map(coordinate => coordinate.trim());
        }

        // Build address component obj
        darkstoreFields.address_components = {};
        if(postalcode) darkstoreFields.address_components.postalcode = postalcode;
        if(street_name) darkstoreFields.address_components.street_name = street_name;
        if(street_number) darkstoreFields.address_components.street_number = street_number;
        if(city) darkstoreFields.address_components.city = city;
        if(state) darkstoreFields.address_components.state = state;
        if(country) darkstoreFields.address_components.country = country;
        if(area) darkstoreFields.address_components.area = area;
        

        try {
            darkstoreFields.store = req.params.storeId;
            // Create
            const newDarkstore = new Darkstore(darkstoreFields);
            
            const darkstore = await newDarkstore.save();
            res.json(darkstore);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route POST api/darkstores/:id
// @desc Edit A Darkstore
// @access Public
router.post('/:id', upload.single('file'), [ auth, [
    check('name', 'Name is required').not().isEmpty()
    ]], async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const {
            name,
            tags,
            street,
            city,
            state, 
            zipcode,
            phone
        } = req.body;

        // Get fields. Build darkstore object
        const darkstoreFields = {};
        if(name) darkstoreFields.name = name;
        if(phone) darkstoreFields.phone = phone;
        if(req.file) categoryFields.img = req.file.id;
        if(req.file) categoryFields.img_name = req.file.filename;
        if(tags) {
            darkstoreFields.tags = tags.split(',').map(tag => tag.trim());
        }

        // Build social array
        darkstoreFields.address = {};
        if(street) darkstoreFields.address.street = street;
        if(city) darkstoreFields.address.city = city;
        if(state) darkstoreFields.address.state = state;
        if(zipcode) darkstoreFields.address.zipcode = zipcode;

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            const store = await Store.findOne({ profile: profile.id });
            darkstoreFields.store = store.id;

            let darkstore = await Darkstore.findById(req.params.id );

            if(!darkstore) {
                return res.status(404).json({ msg: 'Darkstore not found' });
            }

            // Update
            darkstore = await Darkstore.findOneAndUpdate(
                { _id: req.params.id }, 
                { $set: darkstoreFields }, 
                { new: true }
            );

            return res.json(darkstore);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route DELETE api/darkstores/:id
// @desc Delete darkstore
router.delete('/:id', auth, async (req, res) => {
    try {
        const darkstore = await Darkstore.findById(req.params.id);

        if(!darkstore) {
            return res.status(404).json({ msg: 'Darkstore not found' });
        }

        // TODO
        // if(darkstore.store.toString() !== req.params.store_id) {
        //     return res.status(401).json({ msg: 'User not authorized' });
        // }
        
        await darkstore.remove();

        res.json({ msg: 'Location removed' });
    } catch (err) {
        console.error(err.message);
        if(err.name == 'CastError') {
            return res.status(404).json({ msg: 'Location not found' });
        }
        res.status(500).send('Server Error'); 
    }
});

// @route PUT api/darkstores/variant/:locationId/:varId
// @desc Add & Remove New Item to Darkstore's variants
// @access Private
router.put('/variant/:locationId/:varId', auth, async (req, res) => {
    console.log('CONSOLE LOCATION')
    console.log(req.params.varId);
    try {
        const darkstore = await Darkstore.findById(req.params.locationId);

        console.log('CONSOLE 1');
        // Check if variant already in darkstore location
        if(darkstore.variants.length > 0) {
            console.log('CONSOLE 2');
            if(darkstore.variants.filter(variantId => variantId.toString() === req.params.varId).length > 0) {
                console.log('CONSOLE 3');
                // Get remove index
                const removeIndex = darkstore.variants.map(variantId => variantId.toString()).indexOf(req.params.varId);
                console.log('CONSOLE 4');
    
                darkstore.variants.splice(removeIndex, 1);
            } else {
                console.log('CONSOLE 5');
                darkstore.variants.unshift({variant: req.params.varId});
            }
        } else {
            console.log('CONSOLE 6');
            darkstore.variants.unshift({variant: req.params.varId});
        }
        console.log('CONSOLE 7');

        await darkstore.save();

        res.json(darkstore.variants);
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Server Error'); 
    }
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

module.exports = router;

