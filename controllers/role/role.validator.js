const { validate } = require("express-validation");
const Joi = require("joi");

module.exports = {
    createRole: validate({
        body: Joi.object({
            name: Joi.string().required(),
        }),
    }),
};
