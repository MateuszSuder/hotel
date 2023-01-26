import Issue from "../../../schemas/Issue.js";
import genericErrorResponse from "../../../utils/genericErrorResponse.js";
import mongooseErrorResponse from "../../../utils/mongooseErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId, issueId } = req.params;

    try {
        const result = await Issue.findOneAndUpdate(
            { _id: issueId, reservationId },
            { status: "RESOLVED" }
        )

        if(!result) return genericErrorResponse(res, `Problem z id ${issueId} i id rezerwacji ${reservationId} nieznaleziony`, 404);

        res.status(200).send(null);
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}