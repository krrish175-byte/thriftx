const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
require('dotenv').config({ path: '../.env' });

const seedOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB for Order Seeding');

        // Check existing data
        const users = await User.find();
        const products = await Product.find();

        if (users.length === 0 || products.length === 0) {
            console.log('No users or products found. Cannot seed orders.');
            process.exit(1);
        }

        console.log(`Found ${users.length} users and ${products.length} products`);

        const statuses = ['placed', 'confirmed', 'shipped', 'delivered', 'completed', 'cancelled'];
        const paymentStatuses = ['released', 'released', 'released', 'pending', 'pending', 'refunded'];

        const ordersToCreate = [];

        for (let i = 0; i < 25; i++) {
            const buyer = users[Math.floor(Math.random() * users.length)];
            const product = products[Math.floor(Math.random() * products.length)];

            // Ensure seller exists (sometimes products might have old IDs if DB was wiped partially)
            // But here we just assume product.seller is valid ID.
            // If product.seller is populated, use _id, else use it directly
            const sellerId = product.seller._id || product.seller;

            // Random date in last 6 months
            const date = new Date();
            date.setMonth(date.getMonth() - Math.floor(Math.random() * 6));
            date.setDate(Math.floor(Math.random() * 28));

            ordersToCreate.push({
                buyer: buyer._id,
                seller: sellerId,
                product: product._id,
                amount: product.price,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
                createdAt: date,
                deliveryAddress: {
                    street: '123 Campus Road',
                    city: 'Mumbai',
                    state: 'MH',
                    zip: '400056',
                    country: 'India'
                }
            });
        }

        await Order.insertMany(ordersToCreate);
        console.log(`Successfully seeded ${ordersToCreate.length} orders`);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedOrders();
