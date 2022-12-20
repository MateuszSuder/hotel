import mongoose from "mongoose";

const RoomTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

export default mongoose.model("RoomType", RoomTypeSchema);