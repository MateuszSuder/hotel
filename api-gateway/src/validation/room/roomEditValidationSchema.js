import {number, object, string} from "yup";

const roomEditValidationSchema = object({
    roomNumber: number().nullable().positive().integer().label("Numer pokoju"),
    floor: number().nullable().min(0).integer().label("Piętro"),
    roomTypeId: string().nullable().label("ID typu pokoju")
})

export default roomEditValidationSchema;