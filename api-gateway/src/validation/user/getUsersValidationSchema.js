import {mixed, number, object} from "yup";

const getUsersValidationSchema = object({
    limit: number().positive().integer(),
    offset: number().positive().integer(),
    roleFilter: mixed().oneOf([ "ADMIN", "EMPLOYEE", "USER" ]),
    sort: mixed().oneOf([ "emailAsc", "emailDesc" ])
})

export default getUsersValidationSchema;