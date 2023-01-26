import internalFetcher from "../../../http/internalFetcher.js";
import genericErrorResponse from "../../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId, issueId } = req.params;

    try {
        await internalFetcher("reservation", "PUT", `${reservationId}/issue/${issueId}`);

        res.status(200).send(null);
    } catch (e) {
        return genericErrorResponse(res, e, e.status)
    }
}