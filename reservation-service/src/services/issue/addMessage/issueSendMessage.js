import Issue, {Message} from "../../../schemas/Issue.js";
import genericErrorResponse from "../../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { reservationId, issueId } = req.params;
    const { message } = req.body;

    try {
        // todo customer / employee implementation
        const messageObject = new Message({
            sender: "CUSTOMER",
            message,
            dateSent: new Date()
        });

        messageObject.encryptFieldsSync();

        const issue = await Issue.findOneAndUpdate(
            {
                _id: issueId,
                reservationId
            },
            { $addToSet: { messages: messageObject } });

        if(!issue)
            return genericErrorResponse(
                res,
                `Issue with id ${issueId} and reservation id ${reservationId} not found`,
                404
            )

        res.status(200).json(issue);
    } catch (e) {

    }
}