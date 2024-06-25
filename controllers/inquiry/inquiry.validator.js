const { validate } = require("express-validation");
const Joi = require("joi");

module.exports = {
    createInquiry: validate({
        body: Joi.object({
            name: Joi.string().required(),
            phone: Joi.string().required().max(10),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
            message: Joi.string().required(),
        }),
    }),
};
