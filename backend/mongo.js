/* eslint-disable no-undef */
const mongoose = require('mongoose');
const dotenv= require('dotenv');

dotenv.config();

const MONGOURI=process.env.MONGO_URI
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB ');
  } catch (error) {
    console.error('Error connecting to MongoDB :', error);
  }
};

module.exports = connectToDatabase;