import Room from "../../../schemas/Room.js";
import mongooseErrorResponse from "../../../utils/mongooseErrorResponse.js";
/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    try {
        const { roomTypeId, roomNumber, floor } = req.body;

        const room = new Room({ roomTypeId, roomNumber, floor });

        const t = await room.save();

        res.status(201).json({ id: t.id });
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
};
