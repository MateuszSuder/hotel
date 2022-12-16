import User from "../../schemas/User.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    // todo 403 implementation
    const { userId } = req.params;

    try {
        User.findOne({ _id: userId }, async (err, user) => {
            if(err) return mongooseErrorResponse(res, err);

            if(!user) return genericErrorResponse(res, "Not found", 404);

            const newUser = new User(Object.assign(user, req.body));
            await newUser.save();
        })

        res.status(200).send(null);
    } catch (e) {
        console.log(e);
        return mongooseErrorResponse(res, e);
    }
}