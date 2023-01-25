import Reservation from "../../schemas/Reservation.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";
import mongoose from "mongoose";
import Issue from "../../schemas/Issue.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { userId } = req.query;


    try {
        let query = {};

        if(userId) {
            query.userId = new mongoose.Types.ObjectId(userId);
        }

        const reservations = await Reservation.find(query);
        const issues = await Issue.find();

        if(reservations.length) {
            reservations.map(reservation => ({
                ...reservation,
                issues: issues.filter(issue => issue.reservationId === reservation._id)
            }))
        }

        res.status(200).send({ reservations });
    } catch(e) {
        console.log(e);
        return mongooseErrorResponse(res, e);
    }
}