const { validate } = require("express-validation");
const Joi = require("joi");

module.exports = {
    createSetting: validate({
        body: Joi.object({
            facebook: Joi.string().default(null),
            linkedin: Joi.string().default(null),
            instagram: Joi.string().default(null),
            twitter: Joi.string().default(null),
            whatsapp: Joi.string().default(null),
            youtube: Joi.string().default(null),
            pinterest: Joi.string().default(null),
            googleBusiness: Joi.string().default(null),
            address: Joi.string().required(),
            phone: Joi.string().required().max(10),
            email: Joi.string().required(),
        }),
    }),

    updateSetting: validate({
        body: Joi.object({
            address: Joi.string().required(),
            phone: Joi.string().required().max(10),
            email: Joi.string().required(),
        }),
        params: Joi.object({
            id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),

    deleteSetting: validate({
        params: Joi.object({
            id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),
};
