import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    startAt: {
        type: Date,
        required: true
    },
    endAt: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['RESERVED', 'ENDED'],
        default: 'RESERVED'
    },
    totalPrice: {
        type: Number,
        required: true
    }
})

export default mongoose.model("Reservation", reservationSchema);