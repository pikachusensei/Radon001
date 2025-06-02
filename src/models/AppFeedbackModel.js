import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const feedbackModel = mongoose.model('Feedback', feedbackSchema);

export default feedbackModel;