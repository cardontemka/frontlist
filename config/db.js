const mongoose = require('mongoose');
require('dotenv').config()

const MONGODB_URL = process.env.MONGODB_URL

const connect = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGODB_URL);
        console.log('Successfully connnecteede to MongoDB')
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = connect;