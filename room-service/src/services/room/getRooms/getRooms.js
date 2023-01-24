import Room from "../../../schemas/Room.js";
import mongooseErrorResponse from "../../../utils/mongooseErrorResponse.js";
const roomSort = {
    priceAsc: "priceAsc",
    priceDesc: "priceDesc",
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
        const t = await Room.aggregate([
            {
                $lookup: {
                    from: "roomtypes",
                    localField: "roomType",
                    foreignField: "_id",
                    as: "roomType",
                },
            },
            {
                $unwind: { path: "$roomType" },
            },
            {
                $unset: "roomType._id",
            },
            {
                $replaceRoot: {
                    newRoot: { $mergeObjects: ["$$ROOT", "$roomType"] },
                },
            },
            {
                $unset: ["roomType", "__v"],
            },
            {
                $match: { capacity: { $gte: parseInt(capacity || 0) } },
            },
            {
                $sort: {
                    price: s,
                },
            },
            {
                $facet: {
                    pagination: [
                        {
                            $count: "count",
                        },
                        {
                            $addFields: {
                                offset: parseInt(offset || 0),
                                limit: parseInt(limit || 10),
                            },
                        },
                    ],
                    rooms: [
                        {
                            $skip: parseInt(offset || 0),
                        },
                        {
                            $limit: parseInt(limit || 10),
                        },
                    ],
                },
            },
            {
                $addFields: {
                    pagination: {
                        $arrayElemAt: ["$pagination", 0],
                    },
                },
            },
        ]);

        return res.status(200).json(t);
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
};
