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
            return genericErrorResponse(res, "Nieprawidłowe dane", 401);
        }

        if(user.isBlocked || user.isDeleted)
            return genericErrorResponse(res, null, 401);

        const ok = await bcrypt.compare(`${password}.${process.env.PEPPER}`, user.password);

        if(!ok) return genericErrorResponse(res, "Nieprawidłowe dane", 401);

        if(user.twoFactorEnabled) {
            if(!req.body.code) {
                return res.status(401).json({ codeNeeded: true })
            } else {
                const response = await fetch(`https://www.authenticatorApi.com/Validate.aspx?Pin=${req.body.code}&SecretCode=${process.env.AUTHENTICATOR_SECRET}.${user._id}`);
                const success = await response.text();

                if(success === "False") {
                    return genericErrorResponse(res, "Niepoprawny kod", 401);
                }
            }
        }

        const token = jwt.sign({
            id: user._id, email: user.email, role: user.role
        }, process.env.SECRET, {
            expiresIn: "30m"
        });

        delete user.password;
        res.cookie("token", token, { maxAge: 1800000, httpOnly: true }).status(200).json(user)
    } catch (e) {
        console.log(e);
        return genericErrorResponse(res, e, e.status);
    }
}