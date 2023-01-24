import yupErrorResponse from "../../utils/yupErrorResponse.js";
import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import roomValidationSchema from "../../validation/room/roomValidationSchema.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { roomId } = req.path;

    try {
        const room = await roomValidationSchema.validate(req.body);

        try {
            const response = await internalFetcher("room", "PUT", `${roomId}`, {
                body: {
                    ...room
                }
            })

            res.status(200).json(response);
        } catch (e) {
            return genericErrorResponse(res, e, e.status)
        }
    } catch (e) {
        return yupErrorResponse(res, e);
    }
}