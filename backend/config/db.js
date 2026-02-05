const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connUrl = process.env.MONGO_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/campus-thriftx';
    await mongoose.connect(connUrl);
    console.log(`MongoDB Connected: ${connUrl.split('@')[1] || connUrl}`);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
