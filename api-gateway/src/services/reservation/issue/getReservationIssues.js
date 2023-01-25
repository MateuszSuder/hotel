import internalFetcher from "../../../http/internalFetcher.js";
import genericErrorResponse from "../../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId } = req.params;
    const { id, role } = req.user;

    try {
        const response = await internalFetcher("reservation", "GET", `${reservationId}/issue`)

        if(role === "USER" && id !== response.userId) {
            return res.status(403).send(null);
        }

        res.status(200).json(response);
    } catch (e) {
        return genericErrorResponse(res, e, e.status)
    }
}