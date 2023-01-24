import {number, object, string} from "yup";

const roomEditValidationSchema = object({
    roomNumber: number().positive().integer().label("Numer pokoju"),
    floor: number().min(0).integer().label("Piętro"),
    roomTypeId: string().label("ID typu pokoju")
})

export default roomEditValidationSchema;