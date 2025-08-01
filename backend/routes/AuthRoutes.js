import express from "express";
import { body, validationResult } from "express-validator";
import { loginHelper, signupHelper } from "../helpers/authHelpers.js";

const router = express.Router();

export const validateMobileOrEmail = (value) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isMobile = /^\d{10}$/.test(value);

  if (!isEmail && !isMobile) {
    throw new Error("Enter a valid email or 10-digit mobile number");
  }
  return true;
};

router.post(
  "/createuser",
  [
    body("name", "Enter the valid name").isLength({ min: 3 }),
    body(
      "mobileNumberOrEmail",
      "Enter the valid mail id or mobile number"
    ).custom(validateMobileOrEmail),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("country","Please choose your country").isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const resp = await signupHelper({
        name: req.body.name,
        mobileNumberOrEmail: req.body.mobileNumberOrEmail,
        password: req.body.mobileNumberOrEmail,
        country:req.body.country
      });
      console.log(resp);
      if (!resp.success) {
        throw new Error(resp.error);
      }
      res.status(200).json(resp);
    } catch (error) {
      res.status(400).json({ error: error?.message });
    }
  }
);

router.post(
  "/login",
  [
    body(
      "enail",
      "Enter the valid mail id"
    ).custom(validateMobileOrEmail),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const resp = await loginHelper({
        mobileNumberOrEmail: req.body.email,
        password: req.body.password,
      });
      console.log(resp);
      if (!resp.success) {
        throw new Error(resp.error);
      }
      return res.status(200).json(resp);
    } catch (error) {
      res.status(400).json({ error: error?.message });
    }
  }
);


export default router;
