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
const Category = require('../../models/Category');
const Cart = require('../../models/Cart');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Store = require('../../models/Store');
const Darkstore = require('../../models/Darkstore');

//Db Config
const config = require('config');
const { listIndexes } = require('../../models/Product');
const { Console } = require('console');
const db = config.get('mongoURI');

// Google Services API
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

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
        const skip =
            req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

        const products = await Product.find({}, null, { skip, limit: 8 }).sort({ prod_order : 1}).populate('store', ['name', 'img_name']).populate({path: 'locations.location',model: 'darkstore' })

        // const products = await Product.find();

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/products
// @desc Get Products
// @access Public
router.get('/for-you', auth, async (req, res) => {
    console.log('FETCHING FOR YOU');

    const skip =
        req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

    try {
        const prodArray = [];
        let fetchedProducts;
        
        const profile = await Profile.findOne({ user: req.user.id });

        const defaultProducts = await Product.find({}, null, { skip, limit: 8 }).sort({ prod_order : 1}).populate('store', ['name', 'img_name']).populate({path: 'locations.location',model: 'darkstore' })

        for(var i = 0; i < profile.recommendation_tags.length; i++) {
            console.log('TAG VALUE');
            console.log(profile.recommendation_tags[i]);

            fetchedProducts = await Product.find({tags: profile.recommendation_tags[i] }, null, { skip, limit: 8 }).sort({ prod_order : 1}).populate('store', ['name', 'img_name']).populate({path: 'locations.location',model: 'darkstore' })

            console.log('NEW PRODUCTS');
            console.log(fetchedProducts);
            if(fetchedProducts.length > 0) {
                prodArray.push(...fetchedProducts);
            }
            
            console.log('PRODUCTS ARRAY');
            console.log(prodArray);
        }
        console.log('EXIT FOR LOOP')
        console.log(prodArray)

        if(prodArray.length > 8) {
            res.json(prodArray);
        } else {
            res.json(defaultProducts);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/products
// @desc Get Products
// @access Public
router.get('/popular', auth, async (req, res) => {
    console.log('FETCHING POPULAR');

    try {
        const skip =
            req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

        const products = await Product.find({}, null, { skip, limit: 8 }).sort({ view_count : -1}).populate('store', ['name', 'img_name']).populate({path: 'locations.location',model: 'darkstore' })

        // const products = await Product.find();

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/products
// @desc Get Products
// @access Public
router.post('/nearby', async (req, res) => {
    console.log('FETCHING NEARBY');
    console.log(req.body.formatted_address)

    const skip =
        req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

    const destination = req.body.formatted_address.toString()
    // var origin = req.body.origin;
    // var destination = req.body.destination;
    
    // client.distancematrix({
    //     params: {
    //         origins: ["3305 Dallas Pkwy, Plano, TX 75093, USA"],
    //         destinations: ["300 Rivercrest Blvd, Allen, TX 75002, USA"],
    //         key: "AIzaSyAhxRYq5kVL5I2EEuShO9HPSsRrjCA68_4"
    //     }
    // }).then(data => {
    //     console.log(data.data);
    //     res.json(data.data);
    // }).catch(err => console.log(err));

    try {

        const prodArray = [];

        const defaultProducts = await Product.find().populate('store', ['name', 'img_name']).populate({path: 'locations.location',model: 'darkstore' });
        let prodVars
        let darkstore;
        let distancematrix

        for(var i = 0; i < defaultProducts.length; i++) {
            console.log('LOOPING PRODUCTS');

            for(var y = 0; y < defaultProducts[i].locations.length; y++){
                console.log('LOOPING PRODUCTS LOCATIONS')
                console.log(defaultProducts[i].locations[y].location.id)
                console.log(defaultProducts[i].locations[y].location)
                darkstore = await Darkstore.findById(defaultProducts[i].locations[y].location.id);
                console.log('DARKSTORE FOUND:');
                // console.log(darkstore);
                distancematrix = await client.distancematrix({
                    params: {
                        origins: [darkstore.formatted_address],
                        destinations: [destination],
                        unitSystem: 'imperial',
                        travelMode: 'driving',
                        key: "AIzaSyAhxRYq5kVL5I2EEuShO9HPSsRrjCA68_4"
                    }
                })

                // console.log('VAR LOC DISTANCE HERE')
                // console.log(distancematrix.data.rows[0].elements[0]);
        
                if(distancematrix.data.rows[0].elements[0].distance.value < 32186) {
                    console.log('PASSED - PUSHING')
                    if(prodArray.length > 0) {
                        if(prodArray.filter(prod => prod._id.toString() === defaultProducts[i]._id).length > 0) {
                            return
                        } else {
                            prodArray.push(defaultProducts[i]);
                        }
                    } else {
                        prodArray.push(defaultProducts[i]);
                    }
                    // console.log(prodArray);
                } else {
                    console.log('FAILED TO PASS');
                }

                // console.log('ON TO NEXT LOCATION')
            }
            console.log('ON TO NEXT PRODUCT')
        }

        console.log('EXIT FOR LOOP')
        console.log(prodArray.length)

        let slicedArray;

        if(prodArray.length > 0) {
            console.log('GREATER THAN 0');
            console.log(prodArray.length);
            console.log('DEFAULT LENGTH');
            console.log(defaultProducts.length)
            slicedArray = prodArray.slice(skip, skip+8)
            console.log(slicedArray);
            res.json(slicedArray);
        } else {
            console.log('ARRAY IS 0');
            console.log(defaultProducts.length)
            slicedArray = defaultProducts.slice(skip, skip+8)
            res.json(slicedArray);
        }

    } catch(err) {
        console.error(err.message)
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
        const products = await Product.find({ store: req.query.storeId }).populate('store', ['name', 'img_name']).populate({path: 'locations.location',model: 'darkstore' })

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
        const products = await Product.find({ store: req.params.id }).sort({ prod_order : 1}).populate('store', ['name', 'img_name']).populate({path: 'locations.location',model: 'darkstore' })

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/products
// @desc Get Products by Filter
// @access Public
router.get('/filter/:filter', async (req, res) => {
    try {
        const testLength = await Product.find({ tags: req.params.filter });

        const skip =
        req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

        if(testLength.length > skip) {
            const products = await Product.find({tags: req.params.filter }, null, { skip, limit: 8 }).sort({ prod_order : 1}).populate('store', ['name', 'img_name']).populate({path: 'locations.location',model: 'darkstore' })
        
            res.json(products);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/products
// @desc Get Products by Filter without skipping
// @access Public
router.get('/filter/full/:filter', async (req, res) => {
    try {
        const products = await Product.find({ tags: req.params.filter }).sort({ prod_order : 1}).populate('locationId', ['name', 'img_name', 'formatted_address', 'location']).populate('store', ['name', 'img_name']);

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route POST api/products/add_collect/:id/:locationId
// @desc Add / Remove collection from / to product
// @access Private
router.post('/edit_collection/:prodId/:collectionId', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.prodId);

        // Check if product already has collection 
        if(product.collections.filter(collection => collection.collectionId.toString() === req.params.collectionId).length > 0) {
            // Get remove index
            const removeIndex = product.collections.map(collection => collection.collectionId.toString()).indexOf(req.params.collectionId);

            product.collections.splice(removeIndex, 1);
        } else {
            product.collections.unshift({ collectionId: req.params.collectionId });
        }

        await product.save();

        res.json(product.collections);
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Server Error'); 
    }
})

// @route GET api/products/collection/:collectionId
// @desc Get Products in collection
// @access Public
router.get('/collection/:collectionId', async (req, res) => {
    try {
        const productList = [];
        const category = await Category.findById(req.params.collectionId);

        for (var i = 0; i < category.items.length; i++) {
            console.log('HELLO');
            console.log(category.items[i].item)
            const product = await Product.findById(category.items[i].item).sort({ prod_order : 1}).populate('locationId', ['name', 'img_name', 'formatted_address', 'location']).populate('store', ['name', 'img_name']);
            console.log('PRODUCT');
            console.log(product);
            productList.push(product);
            console.log('PRODUCT LIST');
            console.log(productList);
        }

        res.json(productList);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/products
// @desc Get Products by location ID
// @access Public
router.get('/location/:id', async (req, res) => {
    try {
        const variantList = [];
        const darkstore = await Darkstore.findById(req.params.id);

        for (var i = 0; i < darkstore.variants.length; i++) {
            console.log('HELLO');
            console.log(darkstore.variants[i].variant)
            const variant = await Variant.findById(darkstore.variants[i].variant).populate('locationId', ['name', 'img_name', 'formatted_address', 'location']).populate('store', ['name', 'img_name']);
            console.log('PRODUCT');
            console.log(variant);
            variantList.push(variant);
            console.log('PRODUCT LIST');
            console.log(variantList);
        }

        res.json(variantList);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
    
    try {
        const products = await Product.find({ locationId: req.params.id }).sort({ prod_order : 1}).populate('locationId', ['name', 'img_name', 'formatted_address', 'location']).populate('store', ['name', 'img_name']);

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/products/liked/:id
// @desc Get Like Products by user id
// @access Private
router.get('/liked/:id', auth, async (req, res) => {
    try {
        const products = await Product.find({likes: {$elemMatch: {user:req.params.id}}}).populate('locationId', ['name', 'img_name', 'formatted_address', 'location']).populate('store', ['name', 'img_name']);

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET api/products/liked/:id
// @desc Get Products viewed by user id
// @access Private
router.get('/viewed/:id', auth, async (req, res) => {
    try {
        const products = await Product.find({prod_views: {$elemMatch: {user:req.params.id}}}).populate('locationId', ['name', 'img_name', 'formatted_address', 'location']).populate('store', ['name', 'img_name']);

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
        const product = await Product.findById(req.params.id).populate('store', ['name', 'img_name']).populate({path: 'locations.location',model: 'darkstore' })

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
        const products = await Product.find({ category: req.params.category }).sort({ prod_order : 1}).populate('store', ['name', 'img_name']).populate({path: 'locations.location',model: 'darkstore' })

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route POST api/products
// @desc Create A Product
// @access Public
router.post('/add/:storeId', upload.array("file", 10),[ auth, [
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
            console.log('ADD PRODUCT');
            productFields.store = req.params.storeId;
            
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
router.post('/edit/:id/:storeId', upload.single('file'),[ auth, [
        check('name', 'Name is required').not().isEmpty()
    ]], async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        const {
            name,
            category,
            sku,
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
        if(sku) productFields.sku = sku;
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
            console.log('ADDED PRODUCT')

            productFields.store = req.params.storeId;
            
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


// @route POST api/products/image/:id
// @desc Add img to product
// @access Private
router.post('/image/:id', upload.single('file'), async (req, res) => {

    const product = await Product.findById(req.params.id);
    console.log('IMG GALLERY LENGTH');
    console.log(product.img_gallery.length)

    try {
        let orderNum = 1;
        
        if(product.img_gallery && product.img_gallery.length > 0) {
            orderNum = product.img_gallery.length + 1
        }
        console.log('ORDER NUM');
        console.log(orderNum);

        const newImg = {
            img_id: req.file.id,
            img_name: req.file.filename,
            img_order: orderNum
        };

        product.img_gallery.push(newImg);
        await product.save()

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});


// @route POST api/variants/add_variant/:prodId/:varId
// @desc Add variant to product
// @access Private
router.post('/add_variant/:prodId/:varId', auth, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 


    try {
        const product = await Product.findById(req.params.prodId);

        product.variants.unshift({ variantId: req.params.varId });
        await product.save()

        res.json(product.variants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route DELETE api/variants/location/:id/:location_id
// @desc Remove variant from product
// @access Private
router.delete('/variant/:prodId/:varId', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.prodId);

        // Pull out location
        const variant = product.variants.find(variant => variant.variantId.toString() === req.params.varId.toString()); // Will return variant or 'false'

        // Make sure location exists
        if(!variant) {
            return res.status(404).json({ msg: 'variant does not exist' });
        }

        // TODO

        // // Check store is correct store
        // if(location.user.toString() !== req.user.id) {
        //     return res.status(401).json({ msg: 'User not authorized'})
        // }

        // Get remove index
        const removeIndex = product.variants.map(variant => variant.variantId.toString()).indexOf(variant.variantId);

        product.variants.splice(removeIndex, 1);

        await product.save();

        res.json(product.variants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});
// @route POST api/products/image/:id
// @desc Add variant to product
// @access Private
router.post('/variant/:prodId/:varId', auth, async (req, res) => {

    const {
        inventory_qty,
        sale_price,
        price,
        condition,
        color,
        size,
        weight,
        bundle,
        type,
        scent,
        fit,
        flavor,
        material,
    } = req.body;

    const newVariant = {};

    newVariant.var_id = req.params.varId;
    if(inventory_qty) newVariant.inventory_qty = inventory_qty;
    if(price) newVariant.price = price;
    if(sale_price) newVariant.sale_price = sale_price;
    if(sku) newVariant.sku = sku;
    if(color) newVariant.color = color;
    if(size) newVariant.size = size;
    if(weight) newVariant.weight = weight;
    if(type) newVariant.type = type;
    if(bundle) newVariant.bundle = bundle;
    if(scent) newVariant.scent = scent;
    if(fit) newVariant.fit = fit;
    if(flavor) newVariant.flavor = flavor;
    if(material) newVariant.material = material;

    try {
        const product = await Product.findById(req.params.prodId);

        product.variants.push(newVariant);
        await product.save();

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// router.post('/reorder/:prodId/:imgId', async (req, res) => {
//     try {
//         const item = await Product.findById(req.params.prodId);
//         let imgIndex = item.img_gallery.map(img => img.id.toString()).indexOf(req.params.imgId);
//         console.log('INDEX NUM');
//         console.log(imgIndex);
//         const orderNum = imgIndex + 1;
//         console.log('ORDER NUM');
//         console.log(orderNum);

//         // Update
//         const product = await Product.updateMany(
//             { "img_gallery._id": req.params.imgId }, 
//             { $set: { "img_gallery.$.img_order": orderNum } }
//         );

//         res.json(product);
//     } catch (err) {
//         console.log(err);
//     }


// });

// router.post('/reorder/:prodId', async (req, res) => {
//     try {
//         const item = await Product.findById(req.params.prodId);
//         console.log('INDEX NUM');
//         console.log(imgIndex);
//         const orderNum = imgIndex + 1;
//         console.log('ORDER NUM');
//         console.log(orderNum);

//         // Update
//         const product = await Product.updateMany(
//             { "img_gallery._id": req.params.imgId }, 
//             { $set: { "img_gallery.$.img_order": orderNum } }
//         );

//         res.json(product);
//     } catch (err) {
//         console.log(err);
//     }


// });

// Update prod locations to unique variants locations in document(s)
router.post('/init-locations', async (req, res) => {
    console.log('INITIALZING LOCATIONS');
    try {
        const prodArray = await Product.find();
        console.log('GOT PRODUCTS');
        console.log(prodArray);
    
        let locationArray;
        for(var x = 0; x < prodArray.length; x++) { 
            locationArray = [];
            console.log('GETTINGS ARRAY VAR');
            const prodVars = await Variant.find({product: prodArray[x].id});
            console.log('GOT VARS');
            console.log(prodVars.length);
            for(var y = 0; y < prodVars.length; y++) { 
                for(var z = 0; z < prodVars[y].locations.length; z++) {
                    // Check if product already liked by same user
                    if(locationArray.length > 0) {
                        if(locationArray.filter(location => location.location.toString() === prodVars[y].locations[z].location.toString()).length > 0) {
                            // Get remove index
                            const removeIndex = locationArray.map(location => location.location.toString()).indexOf(prodVars[y].locations[z].location.toString());
                            
                            let tempQty = Number(locationArray[removeIndex].qty);

                            locationArray.splice(removeIndex, 1);

                            let tempObj = {};

                            tempObj.location = prodVars[y].locations[z].location;
                            if(prodVars[y].locations[z].qty) tempObj.qty = prodVars[y].locations[z].qty + tempQty;
                            if(prodVars[y].locations[z].price) tempObj.price = prodVars[y].locations[z].price;

                            locationArray.push(tempObj)
                        } else {
                            let tempObj = {};

                            tempObj.location = prodVars[y].locations[z].location;
                            if(prodVars[y].locations[z].qty) tempObj.qty = prodVars[y].locations[z].qty;
                            if(prodVars[y].locations[z].price) tempObj.price = prodVars[y].locations[z].price;

                            locationArray.push(tempObj);
                        }
                    } else {
                        let tempObj = {};

                        tempObj.location = prodVars[y].locations[z].location;
                        if(prodVars[y].locations[z].qty) tempObj.qty = prodVars[y].locations[z].qty;
                        if(prodVars[y].locations[z].price) tempObj.price = prodVars[y].locations[z].price;

                        locationArray.push(tempObj);
                    }
                
                } 
            }
            console.log('FINISHED LOC ARRAY');
            console.log(locationArray);
            
            const productFields = {};
            productFields.locations = locationArray;

            // Update
            await Product.updateMany(
                { _id: prodArray[x].id }, 
                { $set: productFields }
            );
        }

        res.send('SUCCESS');
    } catch (err) {
        console.log(err);
    }
});


// Update prod_order by id (in Bulk on frontend)
router.post('/reorder/:prodId', async (req, res) => {
    console.log('REORDERING CONSOLE');
    try {
        const prod_index = await Product.find({_id: {$lte: req.params.prodId}}).count(); //set order_num to its index or # of documents whos ID's less than it's ID value
        console.log('INDEX NUM');
        console.log(prod_index);
        const orderNum = prod_index;
        console.log('ORDER NUM');
        console.log(orderNum);

        const productFields = {};
        productFields.prod_order = orderNum;

        // Update
        const product = await Product.updateMany(
            { _id: req.params.prodId }, 
            { $set: productFields }
        );

        res.json(product);
    } catch (err) {
        console.log(err);
    }


});

// Update all item's prod_order in Bulk in backend
router.post('/refresh', async (req, res) => {
    console.log('REORDERING CONSOLE');
    try {
        const prodArray = await Product.find();
        console.log('PRODUCT COUNT:')
        console.log(prodArray.length);

        let rangeArray = [];

        for(var i = 0; i < prodArray.length; i++) {
            rangeArray.push(i); // create array of availble order_nums to choose from
        }

        console.log('RANGE ARRAY:')
        console.log(rangeArray);

        let tempRange = [...rangeArray];
        
        for(var x = 0; x < prodArray.length; x++) { // update each item in PRODUCT collection
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

            const productFields = {};
            productFields.prod_order = tempRange[orderValue];
            // Update
            const updateProduct = await Product.findOneAndUpdate(
                { _id: prodArray[x]._id }, 
                { $set: productFields }, 
                { new: true }
            );

           // Get remove index
           const removeIndex = tempRange.indexOf(updateProduct.prod_order);
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

router.post('/reorder/inc/:prodId/:imgId', async (req, res) => {
    try {
        const item = await Product.findById(req.params.prodId);
        let orderNum;
        for(var i = 0; i < item.img_gallery.length; i++) {
            if(item.img_gallery[i]['id'] === req.params.imgId) {
                orderNum = item.img_gallery[i].img_order
                break;
            }
        }
        console.log('ORDER NUM');
        console.log(orderNum);

        if(orderNum < item.img_gallery.length) {
            const newOrderNum = orderNum + 1;
            console.log('NEW ORDER NUM');
            console.log(newOrderNum);

            for(var i = 0; i < item.img_gallery.length; i++) {
                if(item.img_gallery[i]['img_order'] === newOrderNum) {
                    await Product.updateOne(
                        { "img_gallery._id": item.img_gallery[i].id }, 
                        { $set: { "img_gallery.$.img_order": orderNum } }
                    );
                    break;
                }
            }

            // Update
            const product = await Product.updateOne(
                { "img_gallery._id": req.params.imgId }, 
                { $set: { "img_gallery.$.img_order": newOrderNum } }
            );

            res.json(product);
        } else {
            res.send('Already last element')
        }
        
    } catch (err) {
        console.log(err);
    }


});

router.post('/reorder/dec/:prodId/:imgId', async (req, res) => {
    try {
        const item = await Product.findById(req.params.prodId);
        let orderNum;
        for(var i = 0; i < item.img_gallery.length; i++) {
            if(item.img_gallery[i]['id'] === req.params.imgId) {
                orderNum = item.img_gallery[i].img_order
                break;
            }
        }
        console.log('ORDER NUM');
        console.log(orderNum);

        if(orderNum  > 1) {
            const newOrderNum = orderNum - 1;
            console.log('NEW ORDER NUM');
            console.log(newOrderNum);

            // Update
            for(var i = 0; i < item.img_gallery.length; i++) {
                if(item.img_gallery[i]['img_order'] === newOrderNum) {
                    await Product.updateOne(
                        { "img_gallery._id": item.img_gallery[i].id }, 
                        { $set: { "img_gallery.$.img_order": orderNum } }
                    );
                }
            }
            const product = await Product.updateOne(
                { "img_gallery._id": req.params.imgId }, 
                { $set: { "img_gallery.$.img_order": newOrderNum } }
            );

            res.json(product);
        } else {
            res.send('Can not decrement cuz element is lowest element');
        }
        
    } catch (err) {
        console.log(err);
    }


});


// Update prod_order by id (in Bulk on frontend)
router.post('/init-views', async (req, res) => {
    console.log('INITIALZING VIEWS');
    try {
        const prodArray = await Product.find();

        for(var x = 0; x < prodArray.length; x++) { 

            const productFields = {};
            productFields.prod_views = [];
            // Update
            await Product.findOneAndUpdate(
                { _id: prodArray[x].id }, 
                { $set: productFields }, 
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
        const prodArray = await Product.find();

        for(var x = 0; x < prodArray.length; x++) { 

            const productFields = {};
            productFields.view_count = 0;
            // Update
            await Product.findOneAndUpdate(
                { _id: prodArray[x].id }, 
                { $set: productFields }, 
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
// @desc View a Product
// @access Private
router.put('/view/:id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(product.prod_views.length > 0) {
            // Check if product already liked by same user
            if(product.prod_views.filter(view => view.user.toString() === req.user.id).length > 0) {
                res.json(product.prod_views);
            } else {
                product.prod_views.unshift({ user: req.user.id });
            }
        } else {
            product.prod_views.unshift({ user: req.user.id });
        }

        await product.save();
        
        const productFields = {};
        productFields.view_count = product.prod_views.length;

        await Product.findOneAndUpdate(
            { _id: product.id }, 
            { $set: productFields }, 
            { new: true }
        );

        res.json(product.prod_views);
    } catch (err) {
        console.error(err.message);
        
        res.status(500).send('Server Error'); 
    }
})

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

// @route POST api/products/comment/:id
// @desc Comment on a product
// @access Private
router.post('/comment/:id', [ auth, [
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

