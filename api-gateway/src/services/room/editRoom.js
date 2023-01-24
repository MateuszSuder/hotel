import yupErrorResponse from "../../utils/yupErrorResponse.js";
import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import roomEditValidationSchema from "../../validation/room/roomEditValidationSchema.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { roomId } = req.params;

    try {
        const room = await roomEditValidationSchema.validate(req.body);

        try {
            const response = await internalFetcher("room", "PUT", `${roomId}`, {
                body: {
                    ...room
                }
            })

            res.status(200).json(response);
        } catch (e) {
            console.log(e);
            return genericErrorResponse(res, e, e.status)
        }
    } catch (e) {
        console.log(e);
        return yupErrorResponse(res, e);
    }
}