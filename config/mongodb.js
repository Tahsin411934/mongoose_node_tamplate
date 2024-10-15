// config/mongodb.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI; // Ensure you have this in your .env file
        await mongoose.connect(uri); // Remove deprecated options
        console.log('MongoDB এর সাথে সংযুক্ত');
    } catch (error) {
        console.error('MongoDB সংযোগ ত্রুটি:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
