import yupErrorResponse from "../../utils/yupErrorResponse.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import internalFetcher from "../../http/internalFetcher.js";
import {userChangePasswordScheme} from "../../validation/user/userValidation.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { id } = req.params;
    const { id: userId, role } = req.user;

    if(role === "USER" && id !== userId) return genericErrorResponse(res, null, 403);

    try {
        const { actualPassword: currentPassword, newPassword } = await userChangePasswordScheme.validate(req.body);

        if(currentPassword === newPassword) return genericErrorResponse(res, "Nowe hasło musi się różnić od poprzedniego", 400);

        try {
            await internalFetcher("user", "PUT", `${id}/change-password`, {
                body: {
                    currentPassword,
                    newPassword
                }
            })

            res.status(200).send(null);
        } catch (e) {
            console.log(e);
            return genericErrorResponse(res, e, e.status)
        }
    } catch (e) {
        console.log(e);
        return yupErrorResponse(res, e);
    }
}