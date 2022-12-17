/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import RoomType from "../../schemas/RoomType.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";

export default async (req, res) => {
    const { name, description, capacity, price } = req.body;

    try {
        const roomType = new RoomType({
            name, description, capacity, price
        })

        const t = await roomType.save();

        console.log(t);
        res.status(200).send(null);
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}