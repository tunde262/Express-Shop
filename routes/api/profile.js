const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const config = require('config');
const db = config.get('mongoURI');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

//gridfs
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Create Mongo Connection
const conn = mongoose.createConnection(db,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

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

// @route GET api/profile/me
// @desc Ge current user's profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);

        if(!profile) {
            // Build profile object
            const profileFields = {};
            profileFields.user = req.user.id;

            // Create
            profile = new Profile(profileFields);
            
            await profile.save();
            res.json(profile);
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');   
    }
});

// @route GET api/profile/me
// @desc Get profile by id
// @access Private
router.get('/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id).populate('user', ['name']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');   
    }
});

// @route POST api/profile
// @desc Create or update user profile
// @access Private
router.post('/', upload.single('file'), auth, async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(req.file) profileFields.img = req.file.id;
        if(req.file) profileFields.img_name = req.file.filename;


        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if(profile) {
                // Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: profileFields }, 
                    { new: true }
                );

                return res.json(profile);
            }

            // Create
            profile = new Profile(profileFields);
            
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }   
    }
);

// @route GET api/profile
// @desc Get all profiles
// @access Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user id
// @access Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name']);

        if(!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Servor Error');
    }
});

// @route DELETE api/profile
// @desc Delete profile, user, & rest of their data
// @access Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });

        await User.findOneAndRemove({ _id: req.user.id });

        res.json({msg: 'Profile & User deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route DELETE api/profile
// @desc Delete profile by id
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        // Remove Profile
        await Profile.findOneAndRemove(req.params.id);

        res.json({msg: 'Profile deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route PUT api/profile/address_book
// @desc Add to profile address book
// @access Private
router.put('/address_book', [ auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('street', 'Street is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('state', 'State is required').not().isEmpty(),
    check('zipcode', 'Zipcode is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        name, street, city, state, zipcode
    } = req.body;

    const newAddress = {
        name, street, city, state, zipcode
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        console.log(profile);

        profile.address_book.push(newAddress);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route DELETE api/profile/address_book/:addy_id
// @desc Delete address from address_book
// @access Private
router.delete('/address_book/:addy_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.address_book.map(address => address.id).indexOf(req.params.addy_id);

        profile.address_book.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// ---- GridFS ----

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