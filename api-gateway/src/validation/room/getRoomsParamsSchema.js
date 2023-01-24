import {date, mixed, number, object} from "yup";

const getRoomsParamsSchema = object({
    limit: number().positive().integer(),
    offset: number().positive().integer(),
    isReserved: mixed().oneOf(['RESERVED', 'FREE', 'ANY']),
    freeFrom: date().min(new Date()).label("Wolne od"),
    freeTo: date().label("Wolne do"),
    capacity: number().integer().positive().label("Pojemność"),
    sort: mixed().oneOf(['priceAsc', 'priceDesc']),
})

export default getRoomsParamsSchema;