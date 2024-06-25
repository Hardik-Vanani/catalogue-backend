const response = require("../helper/response.helper");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.headers.authtoken;
        if (!token) {
            req.user = { role: "Customer" };
            return next();
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return response.TOKEN_EXPIRED({ res, err });
                } else {
                    return response.TOKEN_NEEDED({ res, err });
                }
            }
            req.user = decoded;
            req.token = token;

            next();
        });
    } catch (error) {
        console.error(error);
        return response.INTERNAL_SERVER_ERROR({ res });
    }
};

module.exports = auth;
