import Room from "../../../schemas/Room.js";
import RoomType from "../../../schemas/RoomType.js";
import genericErrorResponse from "../../../utils/genericErrorResponse.js";
import mongooseErrorResponse from "../../../utils/mongooseErrorResponse.js";
/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    try {
        const { roomTypeId, roomNumber, floor } = req.body;
        const roomType = await RoomType.findById(roomTypeId);

        if (!roomType)
            return genericErrorResponse(
                res,
                `roomTypeId ${roomTypeId} not found`,
                404
            );
        const room = new Room({ roomType: roomTypeId, roomNumber, floor });

        const t = await room.save();

        res.status(201).json({ id: t.id });
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
};
