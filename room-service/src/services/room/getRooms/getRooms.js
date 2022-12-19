import Room from "../../../schemas/Room.js";
import mongooseErrorResponse from "../../../utils/mongooseErrorResponse.js";
const roomSort = {
    priceAsc: 1,
    priceDesc: -1,
};
/**
 * @param {e.Request} req
 * @param {e.Response} res
 */
export default async (req, res) => {
    // todo implement after reservation service
    const { limit, offset, capacity, sort } = req.query;
    let s = 1;
    if (sort && sort === roomSort.priceDesc) {
        s = -1;
    }
    try {
        Room.find()
            .populate("roomType", "name description capacity price", {
                sort: { price: s },
            })
            .skip(offset || 0)
            .limit(limit || 10)
            .exec((err, rooms) => {
                if (err) return mongooseErrorResponse(res, countError);
                Room.countDocuments().exec((countError, count) => {
                    if (countError)
                        return mongooseErrorResponse(res, countError);

                    return res.status(200).json({
                        rooms,
                        pagination: {
                            offset: offset ? parseInt(offset) : 0,
                            limit: limit ? parseInt(limit) : 0,
                            count,
                        },
                    });
                });
            });
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
};
