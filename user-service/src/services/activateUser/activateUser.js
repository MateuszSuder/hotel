import User from "../../schemas/User.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";
import hashPassword from "../../utils/hashPassword.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import bcrypt from "bcrypt";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { userId } = req.params;
    try {
        await User.findOneAndUpdate({ _id: userId }, { isActive: true });
        res.status(200).send(null);
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}