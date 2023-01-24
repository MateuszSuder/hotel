import mongooseErrorResponse from "../../../utils/mongooseErrorResponse.js";
import RoomType from "../../../schemas/RoomType.js";
import genericErrorResponse from "../../../utils/genericErrorResponse.js";
import mongoose from "mongoose";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { typeId } = req.params;

    try {
        const roomType = await RoomType.findOne({ _id: new mongoose.Types.ObjectId(typeId) });

        if(!roomType) return genericErrorResponse(res, `Room type with id "${typeId}" not found`, 404);

        res.status(200).json(roomType);
    } catch (e) {
        console.log(e);
        return mongooseErrorResponse(res, e)
    }
}