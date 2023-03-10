import genericErrorResponse from "../../utils/genericErrorResponse.js";
import internalFetcher from "../../http/internalFetcher.js";

/**
 * @param {e.Request & { user }} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { id } = req.user;
    const { code } = req.body;

    try {
        const response = await fetch(`https://www.authenticatorApi.com/Validate.aspx?Pin=${code}&SecretCode=${process.env.AUTHENTICATOR_SECRET}.${id}`);

        try {
            const success = await response.text() !== "False";

            if(!success) return genericErrorResponse(res, "Niepoprawny kod", 401);

            await internalFetcher("user", "PUT", `/${id}/enable2fa`)

            res.status(200).send({success});
        } catch (e) {
            return genericErrorResponse(res, e, e.status)
        }
    } catch (e) {
        return genericErrorResponse(res, e, e.status);
    }
}