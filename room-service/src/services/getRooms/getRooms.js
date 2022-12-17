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
        let query = roleFilter && { role: roleFilter };
        User.find(query)
            .sort({ email: s })
            .skip(offset || 0)
            .limit(limit || 10)
            .exec((err, users) => {
                if(err) return mongooseErrorResponse(res, err);

                User.countDocuments(query)
                    .exec((countError, count) => {
                        if(countError)  return mongooseErrorResponse(res, countError);

                        return res.status(200).json({
                            users,
                            pagination: {
                                offset: offset ? parseInt(offset) : 0,
                                limit: limit ? parseInt(limit) : 0,
                                count
                            }
                        });
                    })
            })
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
}