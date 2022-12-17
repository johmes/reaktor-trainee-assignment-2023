const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const options = { useNewUrlParser: true }
    mongoose.set('strictQuery', true)
    const conn = await mongoose.connect(process.env.DB_URI, options);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    process.exit(1);
  }
}

module.exports = connectDB;