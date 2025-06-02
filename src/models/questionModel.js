import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
  }, // optional: "DSA", "System", etc.
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Question", questionSchema);
