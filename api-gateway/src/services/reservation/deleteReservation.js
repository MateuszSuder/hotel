import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId } = req.params;

    try {
        const response = await internalFetcher("reservation", "DELETE", `${reservationId}`)

        res.status(200).json(response);
    } catch (e) {
        return genericErrorResponse(res, e, e.status)
    }
}