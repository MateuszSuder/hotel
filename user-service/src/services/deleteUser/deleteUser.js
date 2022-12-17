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
        const result = await User.findOneAndUpdate({ _id: userId }, { isDeleted: true });
        if(result === null) return genericErrorResponse(res, "Not found", 404);

        return res.status(200).send(null);
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}