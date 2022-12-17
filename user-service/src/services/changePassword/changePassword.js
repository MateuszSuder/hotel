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
    const { currentPassword, newPassword } = req.body;

    if(!newPassword) {
        return genericErrorResponse(res, "Password is required", 400);
    }

    if(newPassword < 8) {
        return genericErrorResponse(res, "Password must be at least 8 characters", 400);
    }


    const hashedNewPassword = await hashPassword(newPassword);

    try {
        const user = await User.findOne({ _id: userId });

        if(!await bcrypt.compare(`${currentPassword}.${process.env.PEPPER}`, user.password)) return genericErrorResponse(res, "Incorrect password", 400);

        await User.findOneAndUpdate({ _id: userId }, { password: hashedNewPassword });

        res.status(201).send({ user });
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}