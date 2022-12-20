import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    roomType: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoomType",
    },
    roomNumber: {
        required: true,
        type: Number,
        unique: true,
    },
    floor: {
        required: true,
        type: Number,
    },
});

export default mongoose.model("Room", RoomSchema);
