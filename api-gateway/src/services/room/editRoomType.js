import yupErrorResponse from "../../utils/yupErrorResponse.js";
import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import roomTypeEditValidationSchema from "../../validation/room/roomTypeEditValidationSchema.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { typeId } = req.params;

    try {
        try {
            const roomType = await roomTypeEditValidationSchema.validate(req.body);

            await internalFetcher("room", "PUT", `type/${typeId}`, {
                body: {
                    ...roomType
                }
            })

            res.status(200).send(null);
        } catch (e) {
            return genericErrorResponse(res, e, e.status)
        }
    } catch (e) {
        return yupErrorResponse(res, e);
    }
}