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


    const hashedNewPassword = await hashPassword(newPassword);

    try {
        const user = await User.findOne({ _id: userId });

        if(!await bcrypt.compare(`${currentPassword}.${process.env.PEPPER}`, user.password)) return genericErrorResponse(res, "Nieprawidłowe hasło", 400);

        await User.findOneAndUpdate({ _id: userId }, { password: hashedNewPassword });

        res.status(201).send({ user });
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}