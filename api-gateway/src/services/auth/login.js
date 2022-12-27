import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { email, password } = req.body;
    try {
        const [user] = await internalFetcher("user", "GET", "", {
            query: {
                email
            }
        });

        if(!user) {
            return genericErrorResponse(res, "Incorrect credentials", 401);
        }

        if(user.isBlocked || user.isDeleted)
            return genericErrorResponse(res, null, 401);

        const ok = await bcrypt.compare(`${password}.${process.env.PEPPER}`, user.password);

        if(!ok) return genericErrorResponse(res, "Incorrect credentials", 401);

        const token = jwt.sign({
            id: user._id, email: user.email, role: user.role
        }, process.env.SECRET, {
            expiresIn: "30m"
        });

        res.cookie("token", token, { maxAge: 1800000, httpOnly: true }).status(200).json(user)
    } catch (e) {
        return genericErrorResponse(res, e, e.status);
    }
}