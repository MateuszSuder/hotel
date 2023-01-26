import Reservation from "../../schemas/Reservation.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId } = req.params;

    try {
        const result = await Reservation.findByIdAndDelete(reservationId);

        res.status(200).send(null);
    } catch(e) {
        return mongooseErrorResponse(res, e);
    }
}