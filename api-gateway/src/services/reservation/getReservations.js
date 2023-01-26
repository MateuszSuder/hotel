import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { id, role } = req.user;
    const { userId } = req.query

    try {
        const response = await internalFetcher("reservation", "GET", "")

        let reservations = response.reservations;

        if(role === "USER" || userId) {
            reservations = reservations.filter(reservation => reservation.userId === (userId || id));
        }

        res.status(200).json({ reservations });
    } catch (e) {
        return genericErrorResponse(res, e, e.status)
    }
}