import * as yup from "yup";

const requiredString = "To pole jest wymagane";
const polishLettersString = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;

const phoneRules = /^(\d{3})\s(\d{3})\s(\d{3})$/;
export const editPersonalDataSchema = yup.object({
    name: yup
        .string()
        .matches(polishLettersString, {
            message: "Imię może zawierać tylko litery i polskie znaki",
        })
        .required(requiredString),
    lastName: yup
        .string()
        .matches(polishLettersString, {
            message: "Nazwisko może zawierać tylko litery i polskie znaki",
        })
        .required(requiredString),
    dateOfBirth: yup
        .date()
        .typeError("Podaj prawidłową datę")
        .nullable()
        .max(new Date(), "Podaj prawidłową datę")
        .required(requiredString),
    phoneNumber: yup
        .string()
        .matches(phoneRules, "Podaj poprawny numer telefonu")
        .required(requiredString)
        .trim(),
    address: yup.object({
        city: yup
            .string()
            .matches(polishLettersString, {
                message: "Miasto może zawierać tylko litery i polskie znaki",
            })
            .required(requiredString)
            .max(25, "Nazwa miasta jest za długa"),
        street: yup
            .string()
            .matches(polishLettersString, {
                message: "Ulica może zawierać tylko litery i polskie znaki",
            })
            .max(60, "Nazwa ulicy jest za długa")
            .required(requiredString),
        postal: yup
            .string()
            .matches(/^[0-9]{2}-[0-9]{3}/, {
                message: "Podaj prawidłowy kod pocztowy",
            })
            .required(requiredString),
        houseNumber: yup
            .string()
            .max(5, "Numer budynku jest za długi")
            .required(requiredString),
        apartmentNumber: yup
            .string()
            .max(5, "Numer mieszkania jest za długi")
            .required(requiredString),
    }),
});
