import User from "../../schemas/User.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    const { userId } = req.params;

    try {
        User.findOne({ _id: userId }, async (err, user) => {
            if(err) return mongooseErrorResponse(res, err);

            if(!user) return genericErrorResponse(res, "Not found", 404);

            const { name, lastName, phoneNumber, dateOfBirth, address } = req.body;

            const newUser = new User(Object.assign(user, {name, lastName, phoneNumber, dateOfBirth, address}));
            await newUser.save();
            res.status(200).send(null);
        })
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}