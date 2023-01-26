/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
import User from "../../schemas/User.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";


export default async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    try {
        await User.findOneAndUpdate({ _id: userId }, { role });

        res.status(200).send(null);
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}