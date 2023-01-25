import * as yup from "yup";

const requiredString = "To pole jest wymagane";
const polishLettersString = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;

const phoneRules = /^(\d{3})\s(\d{3})\s(\d{3})$/;
export const editPersonalDataSchema = yup.object({
    name: yup
        .string()
        .matches(polishLettersString, {
            message: "Imię może zawierać tylko litery i polskie znaki",
        }),
    lastName: yup
        .string()
        .matches(polishLettersString, {
            message: "Nazwisko może zawierać tylko litery i polskie znaki",
        }),
    dateOfBirth: yup
        .date()
        .typeError("Podaj prawidłową datę")
        .nullable()
        .max(new Date(), "Podaj prawidłową datę"),
    phoneNumber: yup
        .string()
        .matches(phoneRules, "Podaj poprawny numer telefonu")
        .trim(),
    address: yup.object({
        city: yup
            .string()
            .matches(polishLettersString, {
                message: "Miasto może zawierać tylko litery i polskie znaki",
            })
            .max(25, "Nazwa miasta jest za długa"),
        street: yup
            .string()
            .matches(polishLettersString, {
                message: "Ulica może zawierać tylko litery i polskie znaki",
            })
            .max(60, "Nazwa ulicy jest za długa"),
        postal: yup
            .string()
            .matches(/^[0-9]{2}-[0-9]{3}/, {
                message: "Podaj prawidłowy kod pocztowy",
            }),
        houseNumber: yup
            .string()
            .max(5, "Numer budynku jest za długi"),
        apartmentNumber: yup
            .string()
            .max(5, "Numer mieszkania jest za długi"),
    }),
});

export const userChangePasswordScheme = yup.object({
    actualPassword: yup.string().required(requiredString),
    newPassword: yup
        .string()
        .required(requiredString)
        .matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
            "Hasło musi zawierać od 8 do 16 znaków, dużą oraz małą literę, cyfrę oraz symbol specjalny"
        ),
    confirmNewPassword: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Hasła muszą być takie same")
        .required(requiredString),
});