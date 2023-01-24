const validationErrorMessages = {
    mixed: {
        required: "Pole ${label} jest wymagane",
        oneOf: "Pole ${label} jest niepoprawne"
    },
    number: {
        positive: "Pole ${label} musi być dodatnie",
        min: "Pole ${label} musi być większe bądź równe od ${min}",
        integer: "Pole ${label} musi być liczbą całkowitą"
    },
    string: {
        min: "Pole ${label} musi mieć minimalnie ${max} znaków",
        max: "Pole ${label} może mieć maksymalnie ${max} znaków"
    },
    date: {
        min: "Niepoprawna data ${label}"
    }
}

export default validationErrorMessages;