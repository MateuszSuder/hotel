import {date, mixed, number, object} from "yup";

const getRoomsParamsSchema = object({
    limit: number().positive().integer(),
    offset: number().positive().integer(),
    isReserved: mixed().oneOf(['RESERVED', 'FREE', 'ANY']),
    freeFrom: date().nullable().min(new Date()).label("Wolne od"),
    freeTo: date().nullable().label("Wolne do"),
    capacity: number().nullable().integer().positive().label("Pojemność"),
    sort: mixed().nullable().oneOf(['priceAsc', 'priceDesc']),
})

export default getRoomsParamsSchema;