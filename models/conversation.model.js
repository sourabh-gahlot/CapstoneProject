const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
  recipients: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  text: String,
  media: [String],
},{
  timestamps: true,
});

module.exports = mongoose.model("Conversation", conversationSchema);
