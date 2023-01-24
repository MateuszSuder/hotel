import {number, object, string} from "yup";

const roomValidationSchema = object({
    roomNumber: number().positive().integer().required().label("Numer pokoju"),
    floor: number().min(0).integer().required().label("Piętro"),
    roomTypeId: string().required().label("ID typu pokoju")
})

export default roomValidationSchema;