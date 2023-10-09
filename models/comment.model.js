const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    content: String,
    tag: {},
    reply: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    user: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    postId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
    },
    postUserId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
