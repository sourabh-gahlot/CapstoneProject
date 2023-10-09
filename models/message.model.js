const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversation: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Conversation",
  },
  sender: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  recipients: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  text: {
    type: String,
  },
  media: [String],
},{
  timestamps: true,
});

module.exports = mongoose.model("Message", messageSchema);
