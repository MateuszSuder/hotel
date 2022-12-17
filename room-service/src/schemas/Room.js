import mongoose from "mongoose";
import {ObjectId} from "mongodb";

const RoomSchema = new mongoose.Schema({
    type: {
        required: true,
        type: ObjectId
    },
    roomNumber: {
        required: true,
        type: Number
    },
    floor: {
        required: true,
        type: Number
    }
})

export default mongoose.model("Room", RoomSchema);