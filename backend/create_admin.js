const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' }); // Load env from root

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const email = 'admin_test@example.com';
        const password = 'password123';

        let user = await User.findOne({ email });
        if (user) {
            console.log('User already exists, updating role to admin');
            user.role = 'admin';
            await user.save();
        } else {
            console.log('Creating new admin user');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = new User({
                name: 'Test Admin',
                email,
                password: hashedPassword,
                role: 'admin',
                isVerifiedStudent: true
            });
            await user.save();
        }
        console.log('Admin user ready:', email, password);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();
