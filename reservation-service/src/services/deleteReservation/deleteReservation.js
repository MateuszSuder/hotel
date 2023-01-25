import Reservation from "../../schemas/Reservation.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";
import Room from "../../schemas/Room.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import RoomType from "../../schemas/RoomType.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId } = req.query;

    try {
        await Reservation.findByIdAndDelete(reservationId);

        res.status(200).send(null);
    } catch(e) {
        return mongooseErrorResponse(res, e);
    }
}