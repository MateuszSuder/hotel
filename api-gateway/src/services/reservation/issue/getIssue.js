import internalFetcher from "../../../http/internalFetcher.js";
import genericErrorResponse from "../../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId, issueId } = req.params;

    try {
        const response = await internalFetcher("reservation", "GET", `${reservationId}/issue/${issueId}`)

        res.status(200).json(response);
    } catch (e) {
        return genericErrorResponse(res, e, e.status)
    }
}