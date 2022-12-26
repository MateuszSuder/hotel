import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */


export default async (req, res) => {
    try {
        const response = await internalFetcher("user", "POST", "", {
            body: {
                ...req.body
            }
        });

        res.status(201).json(response);
    } catch (e) {
        return genericErrorResponse(res, e, e.status);
    }
}