import getUsersValidationSchema from "../../validation/user/getUsersValidationSchema.js";
import yupErrorResponse from "../../utils/yupErrorResponse.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import internalFetcher from "../../http/internalFetcher.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    try {
        const query = await getUsersValidationSchema.validate(req.query);

        try {
            const response = await internalFetcher("user", "GET", "", {
                query
            })

            res.status(200).json(response);
        } catch (e) {
            return genericErrorResponse(res, e, e.status)
        }
    } catch (e) {
        return yupErrorResponse(res, e);
    }
}