const Product = require('../models/Product');

// @desc    Get all products (with filters)
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        const { category, search, sort, minPrice, maxPrice, seller, status } = req.query;
        let query = {};

        // Status filter
        if (status && status !== 'all') {
            query.status = status;
        } else if (!status && !seller) {
            // Default to active only for public browsing if no seller specified
            query.status = 'active';
        }
        // If seller is specified but no status (or status='all'), return all products for that seller

        // Filter by Seller
        if (seller) {
            query.seller = seller;
        }

        // Filtering
        if (category) {
            query.category = category;
        }

        if (search) {
            query.$text = { $search: search };
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = minPrice;
            if (maxPrice) query.price.$lte = maxPrice;
        }

        // Sorting
        let sortOptions = { createdAt: -1 }; // Default: Newest first
        if (sort === 'price_asc') sortOptions = { price: 1 };
        if (sort === 'price_desc') sortOptions = { price: -1 };
        if (sort === 'views') sortOptions = { views: -1 };

        const products = await Product.find(query)
            .populate('seller', 'name picture verified verifiedSeller')
            .sort(sortOptions);

        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('seller', 'name picture verified verifiedSeller');

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Increment views
        product.views += 1;
        await product.save();

        res.json(product);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
exports.createProduct = async (req, res) => {
    try {
        let {
            title, description, category, condition, conditionGrade, price,
            brand, size, usageDuration, hasBill, aiSuggestedPrice,
            color, material, measurements, author, brief,
            images
        } = req.body;

        // Map condition from frontend (conditionGrade) if condition is missing
        if (!condition && conditionGrade) {
            condition = conditionGrade;
        }

        // Parse measurements if it comes as a string (from FormData)
        if (measurements && typeof measurements === 'string') {
            try {
                measurements = JSON.parse(measurements);
            } catch (e) {
                console.error("Error parsing measurements:", e);
                measurements = {}; // Default to empty object if parse fails
            }
        }

        // Explicitly ignore images from req.body to prevent CastError from garbage strings
        // Only use files uploaded via Multer
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => file.path);
        } else {
            console.log("No files uploaded or req.files empty");
        }

        const newProduct = new Product({
            seller: req.user.id,
            title,
            description,
            category,
            condition,
            price,
            brand,
            size,
            color,
            material,
            measurements,
            author,
            brief,
            usageDuration,
            hasBill,
            aiSuggestedPrice,
            images: imageUrls
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error("Create Product Error:", err);
        res.status(500).json({ msg: err.message, stack: err.stack });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        // Check user
        if (product.seller.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await product.deleteOne();

        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
};
