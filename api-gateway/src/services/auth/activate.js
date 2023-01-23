import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import crypto from "crypto";
import ActivationSchema from "../../schemas/ActivationSchema.js";
import mongoose from "mongoose";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { token } = req.query;
    try {
        const entry = await ActivationSchema.findOne({
            activationToken: token
        });

        if(entry) {e
            try {
                await internalFetcher("user", "PUT", `/${entry.userId}/activate`);

                return res.redirect("http://localhost/login?activated=true");
            } catch (e) {
                return genericErrorResponse(res, e, e.status);
            }
        }
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}