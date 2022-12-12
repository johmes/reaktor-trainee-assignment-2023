const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect('mongodb+srv://johmes:PqNva0F6js88Hm1Z@birdnest-app.astossl.mongodb.net/?retryWrites=true&w=majority')

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = connectDB;