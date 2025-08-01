import User from "../models/User.js";
import Auth from "../models/Auth.js";

import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const secretKey = "ITS_SECRET";

const saltRounds = 10;

export function generateUniqueAuthId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function isUserRegistered(email, mobile) {
  const user = await User.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
  return { isUser: user !== null, user };
}

export async function isAuthRegistered(user_id) {
  const auth = await Auth.findOne({
    $or: [{ user_id: user_id }],
  });
  return { isAuth: auth !== null, auth };
}

async function createUserAndAuth(userData, authData) {
  try {
    const user = new User({
      user_id: userData.user_id,
      name: userData.name,
      mobile_number: userData.mobile_number,
      email: userData.email,
      country: userData.country,
    });
    await user.save();

    try {
      const auth = new Auth({
        auth_id: generateUniqueAuthId(),
        user_id: user.user_id,
        password_hash: authData.password_hash,
        token: "",
        role: "Customer",
      });
      await auth.save();

      return { user, auth };
    } catch (authError) {
      try {
        await User.deleteOne({ user_id: user.user_id });
      } catch (deleteError) {
        console.error("Failed to rollback user creation:", deleteError);
      }
      throw authError;
    }
  } catch (error) {
    throw error;
  }
}

export async function signupHelper({
  name,
  mobileNumberOrEmail,
  password,
  country,
}) {
  const user_id = mobileNumberOrEmail;

  const mobile_number =
    typeof mobileNumberOrEmail === "number" ? mobileNumberOrEmail : 0;
  const email =
    typeof mobileNumberOrEmail === "number" ? "" : mobileNumberOrEmail;

  if (await isUserRegistered(email, mobile_number).isUser) {
    return {
      success: false,
      error: "Sorry a user with this email/Mobile Number already exist",
    };
  }
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const password_hash = await bcrypt.hash(password, salt);
    const userData = {
      user_id,
      name,
      mobile_number,
      email,
      country,
    };
    const authData = {
      auth_id: generateUniqueAuthId(),
      user_id,
      password_hash,
      token: "",
      role: "Customer",
    };
    const { user, auth } = await createUserAndAuth(userData, authData);

    const jwtToken = generateJWT({
      id: auth.auth_id,
      email: mobileNumberOrEmail,
      role: "Customer",
    });
    return { success: true, user_id, jwtToken };
  } catch (error) {
    return { success: false, error };
  }
}

export function generateJWT(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
}

export function validateJWT(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return true;
  } catch (err) {
    return false;
  }
}

export async function loginHelper({ mobileNumberOrEmail, password }) {
  const mobile_number =
    typeof mobileNumberOrEmail === "number" ? mobileNumberOrEmail : 0;
  const email =
    typeof mobileNumberOrEmail === "number" ? "" : mobileNumberOrEmail;
  const userData = await isUserRegistered(email, mobile_number);
  const authData = await isAuthRegistered(userData.user.user_id);
  if (!userData.isUser || !authData.isAuth) {
    return { success: false, error: "User does not exists" };
  }
  if (await bcrypt.compare(password, authData.auth.password_hash)) {
    return { success: false, error: "Please use correct password" };
  }
  const jwtToken = generateJWT({
    id: authData.auth.auth_id,
    email: userData.user.user_id,
    role: userData.user.role,
  });
  return { success: true, user_id: userData.user.user_id, jwtToken };
}
