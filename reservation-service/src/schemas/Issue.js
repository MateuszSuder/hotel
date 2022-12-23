import mongoose from "mongoose";
import encryptSchema from "../utils/encryptSchema.js";

export const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
        enum: [ "CUSTOMER", "EMPLOYEE" ]
    },
    message: {
        type: String,
        required: true
    },
    dateSent: {
        type: Date,
        required: true
    }
});

encryptSchema(messageSchema);

const issueSchema = new mongoose.Schema({
    reservationId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Reservation"
    },
    issueTopic: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: [ "RESOLVED", "ONGOING" ]
    },
    messages: {
        type: [messageSchema],
        default: []
    }
});

export default mongoose.model("Issue", issueSchema);