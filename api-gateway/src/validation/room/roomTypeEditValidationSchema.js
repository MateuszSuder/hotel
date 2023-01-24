import {number, object, string} from "yup";

const roomTypeValidationSchema = object({
    capacity: number().integer().positive().label("Pojemność"),
    name: string().max(20).trim().label("Nazwa"),
    description: string().trim().label("Opis"),
    price: number().positive().label("Cena")
})

export default roomTypeValidationSchema;