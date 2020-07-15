const express = require('express');
const mongoose = require('mongoose');
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

const Customer = require('../../models/Customer');
const Store = require('../../models/Store');


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

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

// @route GET api/customers/me
// @desc Ge current user's customer profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        let customer = await Customer.findOne({ user: req.user.id }).populate('user', ['name']);

        if(!customer) {
            // Build customer object
            const customerFields = {};
            customerFields.user = req.user.id;

            // Create
            customer = new Customer(customerFields);
            
            await customer.save();
            res.json(customer);
        }

        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');   
    }
});

// @route GET api/customer/me
// @desc Get customer by id
// @access Private
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).populate('user', ['name']);

        if(!customer) {
            return res.status(400).json({ msg: 'There is no customer for this user' });
        }

        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');   
    }
});

// @route POST api/customers
// @desc Create customer
// @access Private
router.post('/', auth, async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const {
            user,
            has_account,
            email,
            phone
        } = req.body;

        // Build customer object
        const customerFields = {};
        if(user) customerFields.user = user;
        if(has_account) customerFields.has_account = has_account;
        if(email) customerFields.email = email;
        if(phone) customerFields.phone = phone;

        try {
            // Create
            const customer = new Customer(customerFields);
            
            await customer.save();
            res.json(customer);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }   
    }
);

// @route POST api/customers
// @desc Edit A Customer
// @access Public
router.post('/:id', upload.single('file'), auth, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const {
        user,
        has_account,
        email,
        phone
    } = req.body;

    // Build customer object
    const customerFields = {};
    if(user) customerFields.user = user;
    if(has_account) customerFields.has_account = has_account;
    if(email) customerFields.email = email;
    if(phone) customerFields.phone = phone; 
    
    try {
        const customer = await Customer.findById(req.params.id);

        if(!customer) {
            return res.status(404).json({ msg: 'Customer not found' });
        }

        // Update
        customer = await Customer.findOneAndUpdate(
            { _id: req.params.id }, 
            { $set: customerFields }, 
            { new: true }
        );

        return res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

// @route PUT api/customers/add/name/:id
// @desc Add Name to customer name array
// @access Private
router.put('/add/name/:id', auth, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        firstname, lastname, customerId
    } = req.body;

    const nameObj = {};

    if(firstname) nameObj.firstname = firstname;
    if(lastname) nameObj.lastname = lastname;

    try {
        if(isEmpty(nameObj)) {
            return;
        } else {
            const store = await Store.findById(req.params.id);
            nameObj.store = store.id;

            const customer = await Customer.findById(customerId);
            console.log(customer);

            customer.name.push(nameObj);

            await customer.save();

            res.json(customer);
        }
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route DELETE api/customers/name/:name_id
// @desc Delete name from customer name array
// @access Private
router.delete('/name/:customer_id/:name_id', auth, async (req, res) => {
    try {

        const customer = await Customer.findById(req.params.customer_id);

        // Get remove index
        const removeIndex = customer.name.map(singleName => singleName.id).indexOf(req.params.name_id);

        customer.name.splice(removeIndex, 1);

        await customer.save();

        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route PUT api/customers/add/note/:id
// @desc Add to Note to customer note array
// @access Private
router.put('/add/note/:id', auth, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        customerId, text
    } = req.body;

    const noteObj = {};

    if(text) noteObj.text = text;
    

    try {
        if(isEmpty(noteObj)) {
            return;
        } else {
            const store = await Store.findById(req.params.id);
            noteObj.store = store.id;
            noteObj.user = req.user.id;

            const customer = await Customer.findById(customerId);
            console.log(customer);

            customer.notes.push(noteObj);

            await customer.save();

            res.json(customer);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route DELETE api/customers/note/:note_id
// @desc Delete notes from customer notes array
// @access Private
router.delete('/note/:customer_id/:note_id', auth, async (req, res) => {
    try {

        const customer = await Customer.findById(req.params.customer_id);

        // Get remove index
        const removeIndex = customer.notes.map(note => note.id).indexOf(req.params.note_id);

        customer.notes.splice(removeIndex, 1);

        await customer.save();

        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route PUT api/customers/add/activity/:id
// @desc Add activity to customer activity array
// @access Private
router.put('/add/activity/:id', auth, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        customerId, text, title
    } = req.body;

    const activityObj = {};

    if(text) activityObj.text = text;
    if(title) activityObj.title = title;

    try {
        if(isEmpty(activityObj)) {
            return;
        } else {
            const store = await Store.findById(req.params.id);
            activityObj.store = store.id;

            const customer = await Customer.findById(customerId);
            console.log(customer);

            customer.activity.push(activityObj);

            await customer.save();

            res.json(customer);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route DELETE api/customers/activity/:activity_id
// @desc Delete activity from customer activity array
// @access Private
router.delete('/activity/:customer_id/:activity_id', auth, async (req, res) => {
    try {

        const customer = await Customer.findById(req.params.customer_id);

        // Get remove index
        const removeIndex = customer.activity.map(act => act.id).indexOf(req.params.activity_id);

        customer.activity.splice(removeIndex, 1);

        await customer.save();

        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route PUT api/customers/add/tag/:id
// @desc Add tags to customer tags array
// @access Private
router.put('/add/tags/:id', auth, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        customerId, tags
    } = req.body;

    const tagObj = {};

    if(tags) {
        tagObj.tags = tags.split(',').map(tag => tag.trim());
    } 

    try {
        if(isEmpty(tagObj)) {
            return;
        } else {
            const store = await Store.findById(req.params.id);
            tagObj.store = store.id;

            const customer = await Customer.findById(customerId);
            console.log(customer);

            customer.tags.push(tagObj);

            await customer.save();

            res.json(customer);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route DELETE api/customers/tags/:tags_id
// @desc Delete tags from customer tags array
// @access Private
router.delete('/tags/:customer_id/:tags_id', auth, async (req, res) => {
    try {

        const customer = await Customer.findById(req.params.customer_id);

        // Get remove index
        const removeIndex = customer.tags.map(tag => tag.id).indexOf(req.params.tag_id);

        customer.tags.splice(removeIndex, 1);

        await customer.save();

        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route PUT api/customers/add/creation_date/:id
// @desc Add to creation_date to customer array
// @access Private
router.put('/add/creation_date/:id', auth, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        customerId
    } = req.body;

    try {
        const store = await Store.findById(req.params.id);

        console.log('CREATION DATE')
        const dateObj = {
            store: store.id
        };

        console.log(dateObj);

        const customer = await Customer.findById(customerId);
        console.log(customer);

        customer.creation_date.push(dateObj);

        await customer.save();

        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route GET api/customers
// @desc Get all customers
// @access Public
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().populate('user', ['name']);
        res.json(customers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route GET api/customers/user/:user_id
// @desc Get customer by user id
// @access Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const customer = await Customer.findOne({ user: req.params.user_id }).populate('user', ['name']);

        if(!customer) return res.status(400).json({ msg: 'Customer not found' });

        res.json(customer);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({msg: 'Customer not found'});
        }
        res.status(500).send('Servor Error');
    }
});

// @route DELETE api/customers/:id
// @desc Delete customer by id
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        // Remove customer
        await Customer.findOneAndRemove(req.params.id);

        res.json({msg: 'Customer deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route PUT api/profile/address_book
// @desc Add to customer address book
// @access Private
router.put('/add/address_book/:id', [ auth, [
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
        customerId, name, street, city, state, zipcode, apartment_number, active
    } = req.body;

    const newAddress = {
        street, city, state, zipcode, apartment_number
    };

    if(name) newAddress.name = name;
    if(apartment_number) newAddress.apartment_number = apartment_number;
    if(active) newAddress.active = active;

    try {
        const store = await Store.findById(req.params.id);
        newAddress.store = store.id;

        const customer = await Customer.findById(customerId);
        console.log(customer);

        customer.address_book.push(newAddress);

        await customer.save();

        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route DELETE api/customers/address_book/:addy_id
// @desc Delete address from address_book
// @access Private
router.delete('/address_book/:customer_id/:addy_id', auth, async (req, res) => {
    try {

        const customer = await Customer.findById(req.params.customer_id);

        // Get remove index
        const removeIndex = customer.address_book.map(address => address.id).indexOf(req.params.addy_id);

        customer.address_book.splice(removeIndex, 1);

        await customer.save();

        res.json(customer);
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