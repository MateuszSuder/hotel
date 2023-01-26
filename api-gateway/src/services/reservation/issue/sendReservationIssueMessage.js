import internalFetcher from "../../../http/internalFetcher.js";
import genericErrorResponse from "../../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId, issueId } = req.params;
    const { message } = req.body;
    const { id, role } = req.user;

    try {
        const [reservation] = await internalFetcher("reservation", "GET", `${reservationId}`);

        if(role === "USER" && reservation.userId !== id) {
            return genericErrorResponse(res, null, 403);
        }

        const response = await internalFetcher("reservation", "POST", `${reservationId}/issue/${issueId}`, {
            body: {
                message,
                sender: reservation.userId === id ? "CUSTOMER" : "EMPLOYEE"
            }
        })

        res.status(200).json(response);
    } catch (e) {
        return genericErrorResponse(res, e, e.status)
    }
}