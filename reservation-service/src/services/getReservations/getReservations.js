import Reservation from "../../schemas/Reservation.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";
import mongoose from "mongoose";
import Issue from "../../schemas/Issue.js";
import reservation from "../../schemas/Reservation.js";

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
        const issues = await Issue.find({ status: "ONGOING" });

        if(reservations.length) {
            const r = reservations.map(reservation => {
                const reservationCopy = JSON.parse(JSON.stringify(reservation));
                const iss = [];

                issues.forEach(issue => {
                    if((issue.reservationId.toString() === reservationCopy._id)) iss.push(issue);
                })

                return {
                    ...reservationCopy,
                    ongoing: !!iss.length
                }
            })

            return res.status(200).send({ reservations: r });
        }

        res.status(200).send({ reservations });
    } catch(e) {
        return mongooseErrorResponse(res, e);
    }
}