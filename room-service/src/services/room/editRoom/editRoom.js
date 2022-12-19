import Room from "../../../schemas/Room.js";
import RoomType from "../../../schemas/RoomType.js";
import genericErrorResponse from "../../../utils/genericErrorResponse.js";
import mongooseErrorResponse from "../../../utils/mongooseErrorResponse.js";
/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { roomId } = req.params;
    const { roomTypeId, roomNumber, floor } = req.body;

    try {
        const roomType = await RoomType.findById(roomTypeId);
        if (!roomType)
            return genericErrorResponse(
                res,
                `roomTypeId ${roomTypeId} not found`,
                404
            );

        const room = await Room.findOneAndUpdate(
            { _id: roomId },
            { roomType: roomTypeId, roomNumber, floor },
            { new: true }
        );

        if (!room)
            return genericErrorResponse(res, `roomId ${roomId} not found`, 404);
        res.status(200).send(room);
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
};
