import yupErrorResponse from "../../utils/yupErrorResponse.js";
import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { roomId } = req.params;
    console.log(roomId);

    try {
        try {
            const response = await internalFetcher("room", "GET", `${roomId}`)

            res.status(200).json(response);
        } catch (e) {
            console.log(e);
            return genericErrorResponse(res, e, e.status)
        }
    } catch (e) {
        console.log(e);
        return yupErrorResponse(res, e);
    }
}