const Product = require('../models/Product');

// @desc    Get all products (with filters)
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        const { category, search, sort, minPrice, maxPrice } = req.query;
        let query = { status: 'active' };

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
        const {
            title, description, category, condition, price,
            brand, size, usageDuration, hasBill, aiSuggestedPrice,
            images // Assuming images are passed as URLs after upload or base64 (for now assuming simplified flow)
        } = req.body;

        // Handle image uploads if handled via middleware in route, req.files would be populated
        let imageUrls = images || [];
        if (req.files) {
            imageUrls = req.files.map(file => file.path); // Local path or Cloudinary URL
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
            usageDuration,
            hasBill,
            aiSuggestedPrice,
            images: imageUrls
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
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
