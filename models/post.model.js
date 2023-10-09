const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  images: [String],
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
  },
  user: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
},{
  timestamps: true,
});

module.exports = mongoose.model("Post", postSchema);
