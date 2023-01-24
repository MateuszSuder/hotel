import genericErrorResponse from "../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { id, email } = req.user;

    try {
        const response = await fetch(`https://www.authenticatorApi.com/pair.aspx?AppName=HotelBSK&AppInfo=${email}&SecretCode=${process.env.AUTHENTICATOR_SECRET}.${id}`);

        res.status(200).send(await response.text());
    } catch (e) {
        return genericErrorResponse(res, e, e.status);
    }
}