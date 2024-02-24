const express = require("express");
const bcrypt = require("bcrypt");
const authModel = require("../models/authSchema");
const jwt = require("jsonwebtoken");
const {
  authMiddleware,
  middleWare,
  verifiedToken,
} = require("../middleWare/MiddleWare");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.json({ error: "all fields are mandatory" });
    }
    const existingUser = await authModel.findOne({ email });
    if (existingUser) {
      return res.json({
        error: "Already exists with this email",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new authModel({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.log(error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ error: "all fields are mandatory", success: false });
    }
    const person = await authModel.findOne({ email });
    if (!person) {
      return res.json({ message: " email not found", success: false });
    }
    const validPass = await bcrypt.compare(password, person.password);
    if (!validPass) {
      return res.json({ error: "Password is incorrect", success: false });
    }
    const token = jwt.sign({ id: person._id }, "SecretKey", {
      expiresIn: "1h",
    });

    res.json({ message: "User Loggedin successfully", success: true, token });
  } catch (error) {
    res.json({ error: "internal server error" });
  }
});

authRouter.post("/getInfo", verifiedToken, async (req, res) => {
  try {
    const user = await authModel.findOne({ _id: req.body.userId });
    console.log(req.body);
    user.password = undefined;
    if (!user) {
      res.json({ error: "user not found", success: false });
    } else {
      res.json({ message: "user Found", data: user, success: true });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = authRouter;
