import yupErrorResponse from "../../utils/yupErrorResponse.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import internalFetcher from "../../http/internalFetcher.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { id } = req.params;

    try {
        try {
            await internalFetcher("user", "POST", `${id}/block`)

            res.status(200).send(null);
        } catch (e) {
            return genericErrorResponse(res, e, e.status)
        }
    } catch (e) {
        return yupErrorResponse(res, e);
    }
}