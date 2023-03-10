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
    const { reservation: {
        roomId, startAt, endAt
    }, userId} = req.body;

    console.log(req.body);

    const now = new Date();
    now.setHours(0, 0, 0, 0)

    if(new Date(startAt) >= new Date(endAt) || new Date(startAt) < now) {
        return genericErrorResponse(
            res,
            `Nieprawidłowy przedział dat rezerwacji`,
            400
        );
    }

    try {
        const room = await Room.findById(roomId);

        if(!room) return genericErrorResponse(
            res,
            `roomTypeId ${roomId} nieznaleziony`,
            404
        );

        const reservations = await Reservation.find({
            roomId,
            startAt: {
                $lt: endAt
            },
            endAt: {
                $gt: startAt
            }
        })

        if(reservations.length) {
            return genericErrorResponse(
                res,
                `Rezerwacja nie jest możliwa z tymi datami`,
                409
            );
        }

        const roomType = await RoomType.findById(room.roomType);

        if(!roomType) {
            return genericErrorResponse(
                res,
                `Internal error`,
                500
            );
        }

        const diffInMs = new Date(endAt) - new Date(startAt)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        const reservation = new Reservation({
            userId,
            roomId,
            startAt,
            endAt,
            totalPrice: roomType.price * diffInDays
        });

        const { id } = await reservation.save();
        res.status(200).send({ id });
    } catch(e) {
        console.log(e);
        return mongooseErrorResponse(res, e);
    }
}