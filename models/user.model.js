const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min:6,
  },
  avatar: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg",
  },
  role: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "Male", "Female", "Other", "other"],
  },
  mobile: {
    type: String,
    min: 5,
  },
  address: {
    type: String,
  },
  story: {
    type: String,
  },
  website: {
    type: String,
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  saved: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
  },
},{
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
