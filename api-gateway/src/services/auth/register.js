import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import crypto from "crypto";
import ActivationSchema from "../../schemas/ActivationSchema.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    try {
        const id = await internalFetcher("user", "POST", "", {
            body: {
                ...req.body
            }
        });

        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_LOGIN,
                pass: process.env.MAIL_PASSWORD
            }
        });

        crypto.randomBytes(48, async (err, buffer) => {
            try {
                const token = buffer.toString('hex');

                try {
                    await transporter.sendMail(
                        {
                            from: "hotel@bsk.com",
                            to: req.body.email,
                            subject: "Aktywuj swoje konto",
                            text: `Twój link aktywacyjny: http://localhost/api/auth/activate?token=${token}`
                        })
                } catch(e) {
                    return res.status(500)
                }

                const activation = new ActivationSchema({
                    userId: new mongoose.Types.ObjectId(id),
                    activationToken: token
                })

                await activation.save();
            } catch (e) {
                return mongooseErrorResponse(res, e);
            }
        })

        res.status(201).json(id);
    } catch (e) {
        return genericErrorResponse(res, e, e.status);
    }
}