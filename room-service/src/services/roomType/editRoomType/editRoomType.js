import RoomType from "../../../schemas/RoomType.js";
import genericErrorResponse from "../../../utils/genericErrorResponse.js";
import mongooseErrorResponse from "../../../utils/mongooseErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { typeId } = req.params;
    const { name, description, capacity, price } = req.body;

    try {
        const roomType = await RoomType
            .findOneAndUpdate({ _id: typeId }, { name, description, capacity, price });

        if(!roomType) return genericErrorResponse(res, `Room type with id "${typeId}" not found`, 404);

        res.status(200).send(null);
    } catch (e) {
        return mongooseErrorResponse(res, e)
    }
}