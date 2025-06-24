const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  author: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date_posted: { type: Date, default: Date.now },
  level: { type: String },
  subject: { type: String },
  answers: [{ type: mongoose.Types.ObjectId, ref: "Answer" }],
  isEdited: { type: Boolean, default: false },
  image: { type: String, required: false },
});

module.exports = mongoose.model("Question", questionSchema);
