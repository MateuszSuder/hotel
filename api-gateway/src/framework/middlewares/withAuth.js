import internalFetcher from "../../http/internalFetcher.js";
import genericErrorResponse from "../../utils/genericErrorResponse.js";
import ROLES from "../../utils/roles.js";
import jwt from "jsonwebtoken";

/**
 * @typedef {'ADMIN' | 'EMPLOYEE' | 'USER'} Role
 */

/**
 * Middleware to authorize api route
 * @param {object} options
 * @param {null | Role} [options.role=null] Role to be required to be possible to access resource
 * @return {(function(e.Request, e.Response, e.NextFunction): void)|*}
 */
const withAuth = (options= {
    role: null
}) => {
    return async (req, res, next) => {
        const apiKey = req.header("X-API-KEY");
        if(apiKey === process.env.API_KEY) {
            req.apiKey = true;
            return next();
        } else {
            try {
                let decoded;
                try {
                    decoded = jwt.verify(req.cookies.token, process.env.SECRET);
                } catch (e) {
                    return genericErrorResponse(res, null, 401);
                }

                if(options.role) {
                    if(ROLES[decoded.role] < ROLES[options.role]) {
                        return genericErrorResponse(res, null, 403);
                    }
                }

                const user = await internalFetcher("user", "GET", `${decoded.id}`);

                if(user.isBlocked)
                    return genericErrorResponse(res, "Użytkownik zablokowany", 401);

                if(user.isDeleted)
                    return genericErrorResponse(res, "Użytkownik usunięty", 401);

                if(!user.isActive)
                    return genericErrorResponse(res, "Użytkownik nieaktywny", 401);

                req.user = decoded;
            } catch (e) {
                return genericErrorResponse(res, null, e.status || 500);
            }
        }

        next();
    }
}

export default withAuth;