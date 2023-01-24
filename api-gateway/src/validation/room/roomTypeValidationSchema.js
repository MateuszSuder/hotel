import {number, object, string} from "yup";

const roomTypeValidationSchema = object({
    capacity: number().required().integer().positive().label("Pojemność"),
    name: string().required().max(20).trim().label("Nazwa"),
    description: string().required().trim().label("Opis"),
    price: number().positive().required().label("Cena")
})

export default roomTypeValidationSchema;