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
    const { limit, offset, capacity, sort, freeFrom, freeTo } = req.query;
    let s = 1;
    if (sort && sort === roomSort.priceDesc) {
        s = -1;
    }
    try {
        const t = await Room.aggregate([
            {
                '$lookup': {
                    'from': 'reservations',
                    'localField': '_id',
                    'foreignField': 'roomId',
                    'as': 'reservations'
                }
            }, {
                '$project': {
                    'reservations': {
                        '$filter': {
                            'input': '$reservations',
                            'as': 'reservation',
                            'cond': {
                                '$and': [
                                    {
                                        '$lt': [
                                            '$$reservation.startAt', new Date(freeTo)
                                        ]
                                    }, {
                                        '$gt': [
                                            '$$reservation.endAt', new Date(freeFrom)
                                        ]
                                    }
                                ]
                            }
                        }
                    },
                    '_id': 1,
                    'roomType': 1,
                    'roomNumber': 1,
                    'floor': 1
                }
            }, {
                '$match': {
                    'reservations': {
                        '$size': 0
                    }
                }
            }, {
                '$unset': 'reservations'
            },
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
                '$addFields': {
                    'roomTypeId': '$roomType._id'
                }
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
                $unset: ["__v"],
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

        return res.status(200).json(t[0]);
    } catch (e) {
        return mongooseErrorResponse(res, e);
    }
};
