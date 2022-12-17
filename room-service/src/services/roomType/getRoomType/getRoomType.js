/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
import mongooseErrorResponse from "../../../utils/mongooseErrorResponse.js";
import RoomType from "../../../schemas/RoomType.js";
import genericErrorResponse from "../../../utils/genericErrorResponse.js";

export default async (req, res) => {
    const { typeId } = req.params;

    try {
        const roomType = await RoomType.findOne({ _id: typeId });

        if(!roomType) return genericErrorResponse(res, `Room type with id "${typeId}" not found`, 404);

        res.status(200).json(roomType);
    } catch (e) {
        return mongooseErrorResponse(res, e)
    }
}