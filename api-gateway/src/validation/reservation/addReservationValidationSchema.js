import {date, object, string} from "yup";

const luhnCheck = val => {
    let checksum = 0; // running checksum total
    let j = 1; // takes value of 1 or 2

    // Process each digit one by one starting from the last
    for (let i = val.length - 1; i >= 0; i--) {
        let calc = 0;
        // Extract the next digit and multiply by 1 or 2 on alternative digits.
        calc = Number(val.charAt(i)) * j;

        // If the result is in two digits add 1 to the checksum total
        if (calc > 9) {
            checksum = checksum + 1;
            calc = calc - 10;
        }

        // Add the units element to the checksum total
        checksum = checksum + calc;

        // Switch the value of j
        if (j === 1) {
            j = 2;
        } else {
            j = 1;
        }
    }

    //Check if it is divisible by 10 or not.
    return (checksum % 10) === 0;
}

const addReservationValidationSchema = object({
    reservation: object({
        roomId: string().required().label("ID typu pokoju"),
        startAt: date().typeError("Niepoprawna data rozpoczęcia rezerwacji").required().label("Data rozpoczęcia"),
        endAt: date().typeError("Niepoprawna data zakończenia rezerwacji").label("Data zakończenia"),
    }),
    paymentData: object({
        cardNumber: string().min(16).max(16).test("card-number", "Niepoprawny numer karty", (value) => {
            if(!/^[0-9]{16}$/.test(value)) return false;

            return luhnCheck(value);
        }).label("Numer karty"),
        cvv: string().min(3).max(3).label("CVV"),
        validTill: date().min(new Date()).label("Data ważności")
    }),
})

export default addReservationValidationSchema;