import yupErrorResponse from "../../utils/yupErrorResponse.js";
import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { id, role } = req.user;
    const { reservationId } = req.query;

    try {
        const response = await internalFetcher("reservation", "GET", `${reservationId}`);

        if(role === "USER" && response.userId !== id)
            return genericErrorResponse(res, "", 403)

        res.status(200).json(response);
    } catch (e) {
        return genericErrorResponse(res, e, e.status)
    }
}