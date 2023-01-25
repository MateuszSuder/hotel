import yupErrorResponse from "../../utils/yupErrorResponse.js";
import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import addReservationValidationSchema from "../../validation/reservation/addReservationValidationSchema.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId } = req.query;

    try {
        const response = await internalFetcher("reservation", "DELETE", `${reservationId}`)

        res.status(200).json(response);
    } catch (e) {
        return genericErrorResponse(res, e, e.status)
    }
}