import * as yup from "yup";

export const requiredString = "To pole jest wymagane";
const polishLettersString = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;

const phoneRules = /^(\d{3})\s(\d{3})\s(\d{3})$/;
export const editPersonalDataSchema = yup.object({
    email: yup
        .string()
        .email("Podaj prawidłowy adres email")
        .required(requiredString),
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
        .required(requiredString),
    phoneNumber: yup
        .string()
        .matches(phoneRules, "Podaj poprawny numer telefonu")
        .required(requiredString)
        .trim(),
    password: yup
        .string()
        .required(requiredString)
        .matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
            "Hasło musi zawierać od 8 do 16 znaków w tym co najmniej 1 dużą i małą literę, co najmniej 1 cyfrę i symbol specjalny nie może też zawierać odstępów"
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Hasła muszą być takie same")
        .required(requiredString),
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
        apartmentNumber: yup.string().max(5, "Numer mieszkania jest za długi"),
    }),
});

export const userChangePasswordSchame = yup.object({
    actualPassword: yup.string().required(requiredString),
    newPassword: yup
        .string()
        .required(requiredString)
        .matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
            "Hasło musi zawierać od 8 do 16 znaków w tym co najmniej 1 dużą i małą literę, co najmniej 1 cyfrę i symbol specjalny nie może też zawierać odstępów"
        ),
    confirmNewPassword: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Hasła muszą być takie same")
        .required(requiredString),
});

export const userReservationRoomSchema = yup.object({
    fromDate: yup
        .date()
        .typeError("Podaj prawidłową datę")
        .required("Data jest wymagana"),
    toDate: yup
        .date()
        .typeError("Podaj prawidłową datę")
        .required("Data jest wymagana"),
    nameOnCard: yup
        .string()
        .matches(polishLettersString, "W tym polu możesz wpisywać tylko litery")
        .required("Imię i nazwisko jest wymagane")
        .max(50, "Podałeś zbyt długą ilość znaków"),
    cardNumber: yup
        .string()
        .matches(/^[0-9]+$/, "W tym polu możesz wpisać tylko liczby")
        .min(16, "Podaj poprawny numer karty")
        .max(16, "Podaj poprawny numer karty")
        .required("Numer karty jest wymagany"),
    validTill: yup
        .string()
        .matches(
            /([0-9]{2})\/([0-9]{2})/,
            "Podaj poprawną datę w formacie: MM/YY"
        )
        .required("Data ważności karty jest wymagana"),
    CVV: yup
        .string()
        .required("Kod CVV jest wymagany")
        .min(3, "Podaj poprawny kod CVV")
        .max(3, "Podaj poprawny kod CVV"),
});
