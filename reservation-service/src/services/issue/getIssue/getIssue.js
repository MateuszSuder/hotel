import Issue from "../../../schemas/Issue.js";
import genericErrorResponse from "../../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId, issueId } = req.params;

    try {
        const issue = await Issue.findOne(
            {
                _id: issueId,
                reservationId
            }, "-__v -messages._id")

        if(!issue)
            return genericErrorResponse(
                res,
                `Issue with id ${issueId} and reservation id ${reservationId} not found`,
                404
            );

        res.status(200).json(issue);
    } catch (e) {

    }
}