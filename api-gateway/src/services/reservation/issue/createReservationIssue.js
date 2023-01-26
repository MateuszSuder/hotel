import reservationIssueValidationSchema from "../../../validation/reservation/reservationIssueValidationSchema.js";
import internalFetcher from "../../../http/internalFetcher.js";
import genericErrorResponse from "../../../utils/genericErrorResponse.js";
import yupErrorResponse from "../../../utils/yupErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId } = req.params;
    const { id } = req.user;

    try {
        const issue = await reservationIssueValidationSchema.validate(req.body);

        try {
            const [reservation] = await internalFetcher("reservation", "GET", `${reservationId}`);

            console.log(reservation.userId);
            console.log(id);

            if(reservation.userId !== id) {
                return genericErrorResponse(res, null, 403);
            }

            const response = await internalFetcher("reservation", "POST", `${reservationId}/issue`, {
                body: {
                    ...issue
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