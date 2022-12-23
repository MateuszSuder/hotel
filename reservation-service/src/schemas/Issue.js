import {fieldEncryption} from "mongoose-field-encryption";
import mongoose from "mongoose";

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

messageSchema.plugin(fieldEncryption, {
    fields: ["message"],
    secret: process.env.ENC_KEY
})

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

export const Message = mongoose.model("Message", messageSchema);
export default mongoose.model("Issue", issueSchema);