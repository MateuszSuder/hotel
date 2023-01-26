import Reservation from "../../schemas/Reservation.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId } = req.params;

    try {
        const result = await Reservation.findOneAndUpdate(
            { _id: reservationId },
            { status: "ENDED" }
        )

        if(!result) return genericErrorResponse(res, `Rezerwacja z id ${reservationId} nieznaleziona`, 404);

        res.status(200).send(null);
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}