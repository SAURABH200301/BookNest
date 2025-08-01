import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import authenticateJWT from '../middleware/AuthenticateJWT.js'

const router = express.Router();

router.get(
  "/:id",
  authenticateJWT,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.id;

    try {
      const user = await User.findOne({ user_id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
