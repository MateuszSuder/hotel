import mongoose from "mongoose";

const activationSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: mongoose.Types.ObjectId,
        unique: true
    },
    activationToken: {
        required: true,
        type: String
    }
})

export default mongoose.model("Activation", activationSchema);