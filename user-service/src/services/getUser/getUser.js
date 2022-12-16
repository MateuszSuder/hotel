import User from "../../schemas/User.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    // todo 403 implementation
    const { userId } = req.params;

    try {
        const query = User.findOne({ _id: userId });

        query.exec(async (err, user) => {
            if(err) return mongooseErrorResponse(res, err);

            if(!user) genericErrorResponse(res, "Not found", 404);

            return res.status(200).send(user);
        })
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}