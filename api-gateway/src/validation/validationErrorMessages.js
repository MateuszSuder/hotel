const validationErrorMessages = {
    mixed: {
        required: "Pole ${label} jest wymagane"
    },
    number: {
        positive: "Pole ${label} musi być dodatnie",
        min: "Pole ${label} musi być większe bądź równe od ${min}",
        integer: "Pole ${label} musi być liczbą całkowitą"
    }
}

export default validationErrorMessages;