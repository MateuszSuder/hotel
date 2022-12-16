import encryptSchema from "../utils/encryptSchema.js";
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    city: {
        required: true,
        type: String
    },
    street: {
        required: true,
        type: String
    },
    postal: {
        required: true,
        type: String
    },
    houseNumber: {
        required: true,
        type: String
    },
    apartmentNumber: String
})

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    dateOfBirth: {
        required: true,
        type: String
    },
    phoneNumber: {
        required: true,
        type: String,
        unique: true
    },
    role: {
        required: true,
        enum: ['USER', 'EMPLOYEE', 'ADMIN'],
        type: String,
        index: true
    }
});

encryptSchema(userSchema);

export default mongoose.model("User", userSchema);