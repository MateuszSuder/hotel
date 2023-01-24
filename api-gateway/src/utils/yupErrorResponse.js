import genericErrorResponse from "./genericErrorResponse.js";

/**
 * Create http error response when mongoose error
 * @param {e.Response} response
 * @param {module:yup.ValidationError} e error caught from yup
 */
export default function yupErrorResponse(response, e) {
    return genericErrorResponse(response, { [e.path]: e.errors }, 400);
}