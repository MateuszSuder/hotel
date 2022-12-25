import mongooseErrorResponse from "../../../utils/mongooseErrorResponse.js";
import Issue from "../../../schemas/Issue.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId } = req.params;
    const { issueTopic } = req.body;

    try {
        const issue = new Issue({
            reservationId,
            issueTopic,
            status: "ONGOING"
        });
        const { id } = await issue.save();
        res.status(201).json({id})
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}