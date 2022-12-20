import { ObjectID } from "bson";
import Room from "../../../schemas/Room.js";
import genericErrorResponse from "../../../utils/genericErrorResponse.js";
import mongooseErrorResponse from "../../../utils/mongooseErrorResponse.js";
/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { roomId } = req.params;
    try {
        const room = await Room.aggregate([
            {
                $match: {
                    _id: ObjectID(roomId),
                },
            },
            {
                $lookup: {
                    from: "roomtypes",
                    localField: "roomType",
                    foreignField: "_id",
                    as: "roomType",
                },
            },
            {
                $unwind: {
                    path: "$roomType",
                },
            },
            {
                $unset: "roomType._id",
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ["$$ROOT", "$roomType"],
                    },
                },
            },
            {
                $unset: ["roomType", "__v"],
            },
        ]);
        if (!room)
            return genericErrorResponse(
                res,
                `Room with id "${roomId}" not found`,
                404
            );

        res.status(200).json(room);
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
};
