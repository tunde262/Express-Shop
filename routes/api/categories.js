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
router.get('/', async (req, res) => {
    console.log('IN GET PRODUCTS /');
    try {
        const testLength = await Category.find().sort({ cat_order : 1}).populate('store', ['name', 'img_name']);

        const skip =
        req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

        if(testLength.length > skip) {
            const categories = await Category.find({}, null, { skip, limit: 8 }).sort({ cat_order : 1})
        
            res.json(categories);
        } else {
            res.json(testLength);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Servor Error');
    }
});

// @route GET api/categories
// @desc Get Trending Categories
// @access Public
router.get('/trending', async (req, res) => {
    console.log('FETCHING POPULAR');

    try {
        const skip =
            req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

        const categories = await Category.find({}, null, { skip, limit: 11 }).sort({ view_num : -1}).populate('store', ['name', 'img_name'])

        // const categories = await categorie.find();

        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/stores
// @desc Get Categories by Tag Filter
// @access Public
router.get('/filter/:filter', async (req, res) => {
    try {
        const testLength = await Category.find({ tags: req.params.filter });

        const skip =
        req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

        if(testLength.length > skip) {
            const stores = await Category.find({tags: req.params.filter }, null, { skip, limit: 8 }).sort({ cat_order : 1})
        
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
// @desc Get Categories by tag Filter without skipping
// @access Public
router.get('/filter/full/:filter', async (req, res) => {
    try {
        const categories = await Category.find({ tags: req.params.filter }).sort({ cat_order : 1});

        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/variants
// @desc Get Categories by store 
// @access Public
router.get('/storeid/:storeId', auth, async (req, res) => {
    try {
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

// @route GET api/categories/liked/:id
// @desc Get Liked Categories by user id
// @access Private
router.get('/liked/:id', auth, async (req, res) => {
    try {
        const categories = await Category.find({likes: {$elemMatch: {user:req.params.id}}}).populate('store', ['name', 'img_name']);

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
router.post('/admin/add/:storeId', upload.single('file'), [ auth, [ 
        check('name', 'Name is required').not().isEmpty(),
    ]], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            tags,
            visible
        } = req.body;

        // Get fields
        const categoryFields = {};
        if(name) categoryFields.name = name;
        if(visible) categoryFields.visible = visible;
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

// @route POST api/categories
// @desc Create A Profile Collection
// @access Private
router.post('/profile/add/:profileId', upload.single('file'), [ auth, [ 
        check('name', 'Name is required').not().isEmpty(),
    ]], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            tags,
            visible
        } = req.body;

        // Get fields
        const categoryFields = {};
        if(name) categoryFields.name = name;
        if(visible) categoryFields.visible = visible;
        if(req.file) categoryFields.img = req.file.id;
        if(req.file) categoryFields.img_name = req.file.filename;
        if(tags) {
            categoryFields.tags = tags.split(',').map(tag => tag.trim()); //trim makes sure theres no spaces
        }

        categoryFields.profiles = [];

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            console.log('COLLECTION ADDITION STARTED')
            console.log('PROFILE')
            console.log(profile)
            categoryFields.profiles.push({
                profile: profile.id
            });
            
            // Create
            const newCategory = new Category(categoryFields);
        
            await newCategory.save();
            console.log('COLLECTION ADDED NOW PROFILE')

            profile.categories.unshift({ category: newCategory._id });

            await profile.save();

            res.json(newCategory);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route POST api/categories/admin/:id/:storeId
// @desc Edit Category
// @access Private
router.post('/admin/edit/:id/:storeId', upload.single('file'), [ auth, [
    check('name', 'Name is required').not().isEmpty()
    ]], async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const {
            name,
            tags,
            visible
        } = req.body;

        // Get fields
        const categoryFields = {};
        if(name) categoryFields.name = name;
        if(visible) categoryFields.visible = visible;
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

// @route POST api/categories/profile/:id/:profileId
// @desc Edit Profile Category
// @access Private
router.post('/profile/edit/:id/:profileId', upload.single('file'), [ auth, [
    check('name', 'Name is required').not().isEmpty()
    ]], async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const {
            name,
            tags,
            visible
        } = req.body;

        // Get fields
        const categoryFields = {};
        if(name) categoryFields.name = name;
        if(visible) categoryFields.visible = visible;
        if(req.file) categoryFields.img = req.file.id;
        if(req.file) categoryFields.img_name = req.file.filename;
        if(tags) {
            categoryFields.tags = tags.split(',').map(tag => tag.trim()); //trim makes sure theres no spaces
        }

        try {
            // const profile = await Profile.findOne({ user: req.user.id });
            // const store = await Store.findOne({ profile: profile.id });

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

// Reorder categories by changing cat_value
router.post('/refresh', async (req, res) => {
    console.log('REORDERING CONSOLE');
    try {
        const categoryArray = await Category.find();
        console.log('COLLECTION COUNT:')
        console.log(categoryArray.length);

        let rangeArray = [];

        for(var i = 0; i < categoryArray.length; i++) {
            rangeArray.push(i);
        }

        console.log('RANGE ARRAY:')
        console.log(rangeArray);

        let tempRange = [...rangeArray];
        
        for(var x = 0; x < categoryArray.length; x++) {
            const lastElement = tempRange.length - 1;

            console.log('LAST ELEMENT:')
            console.log(tempRange[lastElement]);
            
            let orderValue

            if( tempRange.length > 1) {
                let min = Math.ceil(tempRange[0]);
                let max = Math.floor(tempRange[lastElement]);
                orderValue = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
                
                for(var i = 0; i < 100; i++) {
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

            const categoryFields = {};
            categoryFields.cat_order = tempRange[orderValue];
            // Update
            const updateCategory = await Category.findOneAndUpdate(
                { _id: categoryArray[x]._id }, 
                { $set: categoryFields }, 
                { new: true }
            );

           // Get remove index
           const removeIndex = tempRange.indexOf(updateCategory.cat_order);
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
        const categoryArray = await Category.find();

        for(var x = 0; x < categoryArray.length; x++) { 

            const categoryFields = {};
            categoryFields.view_count = [];
            // Update
            await Category.findOneAndUpdate(
                { _id: categoryArray[x].id }, 
                { $set: categoryFields }, 
                { new: true }
            );
        }

        res.send('SUCCESS');
    } catch (err) {
        console.log(err);
    }
});

// Update view count to 0
router.post('/reset-view-count', async (req, res) => {
    console.log('RESETING VIEW COUNT');
    try {
        const categoryArray = await Category.find();

        for(var x = 0; x < categoryArray.length; x++) { 

            const categoryFields = {};
            categoryFields.view_num = 0;
            // Update
            await Product.findOneAndUpdate(
                { _id: categoryArray[x].id }, 
                { $set: categoryFields }, 
                { new: true }
            );
        }

        res.send('SUCCESS');
    } catch (err) {
        console.log(err);
    }
});

// ---- Interactions -----

// @route PUT api/products/view/:id
// @desc View a Category
// @access Private
router.put('/view/:id', auth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if(category.view_count.length > 0) {
            // Check if category already liked by same user
            if(category.view_count.filter(view => view.user.toString() === req.user.id).length > 0) {
                res.json(category.view_count);
            } else {
                category.view_count.unshift({ user: req.user.id });
            }
        } else {
            category.view_count.unshift({ user: req.user.id });
        }

        await category.save();

        const catFields = {};
        catFields.view_num = category.view_count.length;

        await Category.findOneAndUpdate(
            { _id: category.id }, 
            { $set: catFields }, 
            { new: true }
        );

        res.json(category.view_count);
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Server Error'); 
    }
})

// @route PUT api/categories/like/:id
// @desc Like a Category
// @access Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        // Check if category already liked by same user
        if(category.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            // Get remove index
            const removeIndex = category.likes.map(like => like.user.toString()).indexOf(req.user.id);

            category.likes.splice(removeIndex, 1);
        } else {
            category.likes.unshift({ user: req.user.id });
        }

        await category.save();

        res.json(category.likes);
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Server Error'); 
    }
})

// @route POST api/categories/comment/:id
// @desc Comment on a category
// @access Private
router.post('/comment/:id', [ auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select('-password');
    const category = await Category.findById(req.params.id);
    console.log('COMMEN4444')

    try {
        const newComment = {
            text: req.body.text,
            name: user.name,
            user: req.user.id
        };

        console.log('COMMENT')
        console.log(newComment);

        category.comments.unshift(newComment);
        await category.save()

        res.json(category.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route DELETE api/products/comment/:id/:comment_id
// @desc Remove comment on a collection
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        // Pull out comment
        const comment = category.comments.find(comment => comment.id === req.params.comment_id); // Will return comment or 'false'

        // Make sure comment exists
        if(!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        // Check user is creator of post
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized'})
        }

        // Get remove index
        const removeIndex = category.comments.map(comment => comment.id.toString()).indexOf(comment.id);

        category.comments.splice(removeIndex, 1);

        await category.save();

        res.json(category.comments);
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

