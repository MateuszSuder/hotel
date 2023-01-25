import yupErrorResponse from "../../utils/yupErrorResponse.js";
import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import addReservationValidationSchema from "../../validation/reservation/addReservationValidationSchema.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { id } = req.user;

    try {
        const reservation = await addReservationValidationSchema.validate(req.body);

        try {
            const response = await internalFetcher("reservation", "POST", "", {
                body: {
                    ...req.body,
                    reservation: {
                        ...reservation,
                        userId: id
                    },
                }
            })

            res.status(200).json(response);
        } catch (e) {
            return genericErrorResponse(res, e, e.status)
        }
    } catch (e) {
        return yupErrorResponse(res, e);
    }
}