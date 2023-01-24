import yupErrorResponse from "../../utils/yupErrorResponse.js";
import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import roomTypeValidationSchema from "../../validation/room/roomTypeValidationSchema.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    try {
        try {
            const roomType = await roomTypeValidationSchema.validate(req.body);

            const response = await internalFetcher("room", "POST", `type`, {
                body: {
                    ...roomType
                }
            })

            res.status(200).json(response);
        } catch (e) {
            console.log(e);
            return genericErrorResponse(res, e, e.status)
        }
    } catch (e) {
        return yupErrorResponse(res, e);
    }
}