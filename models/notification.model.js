const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    recipient: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    url: {
      type: String,
    },
    text: {
      type: String,
    },
    content: {
      type: String,
    },
    image: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
