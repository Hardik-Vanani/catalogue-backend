const { validate } = require("express-validation");
const Joi = require("joi");

module.exports = {
    createUser: validate({
        body: Joi.object({
            username: Joi.string().required().lowercase(),
            password: Joi.string().required(),
            address: Joi.string().required(),
            mobileNo: Joi.string().required().max(10),
        }),
    }),

    loginUser: validate({
        body: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        }),
    }),
};
