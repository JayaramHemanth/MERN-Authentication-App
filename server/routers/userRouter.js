const express = require("express");
const userModel = require('../models/userSchema')

const userRouter = express.Router();

userRouter.post("/createuser", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new userModel({
      name,
      email,
      age
    });
    await newUser.save();
    res.json({ message: "data sent succussfully" });
  } catch (error) {
    console.log(error);
  }
});


userRouter.get("/getData", async (req, res) => {
  try {
    const data = await userModel.find();
    res.json({ message: "data Fetched Successfully", data });
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/getSingle/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const singleUser = await userModel.findById({ _id: id });
    if (singleUser) {
      res.json({ message: "User fetched", singleUser, success: true });
    } else {
      res.json({ error: "User not fetched", success: false });
    }
  } catch (error) {
    console.log(error);
  }
});

userRouter.put("/update/:id", async (req, res) => {
  try {
    const { name, email,age } = req.body;
    const id = req.params.id;
    const updatedData = await userModel.findByIdAndUpdate(
      { _id: id },
      { name, email,age },
      { new: true }
    );
    if (!updatedData) {
      return res.json({ error: "user not updated" });
    }
    res.json({ message: "user updated Successfully", updatedData });
  } catch (error) {
    console.log(error);
  }
});
userRouter.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const deleteUser = await userModel.findByIdAndDelete({ _id: id });
    if (deleteUser) {
      return res.json({ message: "Deleted Successfully", success: true });
    } else {
      return res.json({ error: "Deleted not Successfully", success: false });
    }
  } catch (error) {
    res.json({ error: "Internal Server Error", success: false });
  }
});

module.exports = userRouter;
