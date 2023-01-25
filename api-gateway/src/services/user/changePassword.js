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
        const { actualPassword: currentPassword, newPassword } = await userChangePasswordScheme(req.body);

        try {
            await internalFetcher("user", "PUT", `${id}/changePassword`, {
                body: {
                    currentPassword,
                    newPassword
                }
            })

            res.status(200).send(null);
        } catch (e) {
            return genericErrorResponse(res, e, e.status)
        }
    } catch (e) {
        return yupErrorResponse(res, e);
    }
}