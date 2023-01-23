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
    address: {
        type: addressSchema,
        required: true
    },
    role: {
        required: true,
        enum: ['USER', 'EMPLOYEE', 'ADMIN'],
        type: String,
        index: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    twoFactorEnabled: {
        type: Boolean,
        default: false
    }
});

encryptSchema(userSchema, ['password', 'isDeleted', 'isBlocked', 'isActive', 'twoFactorEnabled']);

export default mongoose.model("User", userSchema);