import RoomType from "../../../schemas/RoomType.js";
import mongooseErrorResponse from "../../../utils/mongooseErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { name, description, capacity, price } = req.body;

    try {
        const roomType = new RoomType({
            name, description, capacity, price
        })

        const t = await roomType.save();

        res.status(201).json({
            id: t.id
        });
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}