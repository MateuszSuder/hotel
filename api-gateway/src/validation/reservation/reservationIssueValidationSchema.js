import {object, string} from "yup";

const reservationIssueValidationSchema = object({
    issueTopic: string().required().max(50).label("Tytuł problemu")
})

export default reservationIssueValidationSchema;