import User from "../../schemas/User.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import bcrypt from 'bcrypt';

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { password, role } = req.body;

    if(!password) {
        return genericErrorResponse(res, "Password is required", 400);
    }

    if(password < 8) {
        return genericErrorResponse(res, "Password must be at least 8 characters", 400);
    }

    const hashedPassword = await bcrypt.hash(password + process.env.PEPPER, 10)

    const user = new User({ ...req.body, password: hashedPassword, role: role || "USER" });

    try {
        const { id } = await user.save();
        res.status(201).send({ id });
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}