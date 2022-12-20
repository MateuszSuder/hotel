import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";
import Reservation from "../../schemas/Reservation.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import mongoose from "mongoose";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId } = req.params;

    try {
        const reservation = await Reservation.aggregate([
            {
                '$unset': '__v'
            }, {
                '$match': {
                    '_id': new mongoose.Types.ObjectId(reservationId)
                }
            }, {
                '$lookup': {
                    'from': 'rooms',
                    'localField': 'roomId',
                    'foreignField': '_id',
                    'as': 'room'
                }
            }, {
                '$unwind': {
                    'path': '$room'
                }
            }, {
                '$unset': [
                    'room._id', 'room.__v'
                ]
            }, {
                '$lookup': {
                    'from': 'roomtypes',
                    'localField': 'room.roomType',
                    'foreignField': '_id',
                    'as': 'roomType'
                }
            }, {
                '$unwind': {
                    'path': '$roomType'
                }
            }, {
                '$unset': [
                    'roomType._id', 'roomType.__v'
                ]
            }, {
                '$addFields': {
                    'room': {
                        '$mergeObjects': [
                            '$room', '$roomType'
                        ]
                    }
                }
            }, {
                '$unset': [
                    'roomType', 'room.roomType'
                ]
            }
        ]);

        if(!reservation.length) {
            return genericErrorResponse(
                res,
                `Reservation with id ${reservationId} not found`,
                404
            );
        }

        res.status(200).json(reservation);
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}