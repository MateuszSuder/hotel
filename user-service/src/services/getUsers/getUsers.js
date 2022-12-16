import User from "../../schemas/User.js";
import mongooseErrorResponse from "../../utils/mongooseErrorResponse.js";

const userSort = {
    emailAsc: 1,
    emailDesc: -1
}

/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    // todo 403 implementation
    const { offset, limit, roleFilter, sort } = req.query;

    // Sort
    let s = 1;

    if(sort && sort === userSort.emailDesc) {
        s = -1;
    }

    try {
        let query = User
            .find(roleFilter && { role: roleFilter  })
            .sort({ email: s })
            .skip(offset)
            .limit(limit);
        query.exec((err, users) => {
            if(err) return mongooseErrorResponse(res, err);

            return res.status(200).send(users);
        })
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}