import Issue from "../../../schemas/Issue.js";
import mongooseErrorResponse from "../../../utils/mongooseErrorResponse.js";
import Reservation from "../../../schemas/Reservation.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId } = req.params;

    try {
        const issues = await Issue.find(
            {
                reservationId
            }, "-__v -messages._id")

        const { userId } = await Reservation.findById(reservationId);

        res.status(200).json({issues, userId});
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}