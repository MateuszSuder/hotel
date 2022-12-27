import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { id } = req.user;
    console.log(req.user);

    try {
        if(!id)
            return genericErrorResponse(res, "Incorrect credentials", 401);
        const user = await internalFetcher("user", "GET", `${id}`);

        const { password, ...rest } = user;

        res.status(200).json(rest);
    } catch (e) {
        console.log(e);
        return genericErrorResponse(res, e, e.status);
    }
}