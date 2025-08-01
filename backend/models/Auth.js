/* eslint-disable no-undef */
import { Schema, model } from "mongoose";

const AuthSchema = new Schema({
  auth_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true, unique: true, ref: "User" }, // Mobile number or email
  password_hash: { type: String, required: true },
  token: { type: String },
  token_expiry: { type: Date },
  role: { type: String, required: true },
});

export default model("Auth", AuthSchema);
