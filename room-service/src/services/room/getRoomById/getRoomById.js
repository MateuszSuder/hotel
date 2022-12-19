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
        const r = await Room.findOne({ _id: roomId });

        if (!r)
            return genericErrorResponse(
                res,
                `Room with id "${roomId}" not found`,
                404
            );

        res.status(200).json(r);
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
};
