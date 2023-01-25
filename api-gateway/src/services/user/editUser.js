import yupErrorResponse from "../../utils/yupErrorResponse.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import internalFetcher from "../../http/internalFetcher.js";
import {editPersonalDataSchema} from "../../validation/user/userValidation.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { id } = req.params;
    const { id: userId, role } = req.user;

    if(role === "USER" && id !== userId) return genericErrorResponse(res, null, 403);

    try {
        const body = await editPersonalDataSchema.validate(req.body);

        try {
            const response = await internalFetcher("user", "PUT", `${id}`, {
                body
            })

            res.status(200).json(response);
        } catch (e) {
            return genericErrorResponse(res, e, e.status)
        }
    } catch (e) {
        return yupErrorResponse(res, e);
    }
}