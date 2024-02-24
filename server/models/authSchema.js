const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

const authModel = mongoose.model("authenticate", authSchema);
module.exports = authModel;
