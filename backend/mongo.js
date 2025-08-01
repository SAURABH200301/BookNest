/* eslint-disable no-undef */
import { connect } from "mongoose";
import { config } from "dotenv";

config();

const MONGOURI = process.env.MONGO_URI;
const connectToDatabase = async () => {
  try {
    await connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB ");
  } catch (error) {
    console.error("Error connecting to MongoDB :", error);
  }
};

export default connectToDatabase;
