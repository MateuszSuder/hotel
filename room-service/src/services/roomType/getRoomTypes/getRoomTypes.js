import mongooseErrorResponse from "../../../utils/mongooseErrorResponse.js";
import RoomType from "../../../schemas/RoomType.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    // todo 403 implementation
    try {
        const roomTypes = await RoomType.find(
            {},
            "name capacity price description"
        );
        return res.status(200).json({
            roomTypes,
        });
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
};
