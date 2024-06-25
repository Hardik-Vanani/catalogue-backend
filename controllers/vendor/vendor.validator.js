const { validate } = require("express-validation");
const Joi = require("joi");

module.exports = {
    updateVendor: validate({
        body: Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            mobileNo: Joi.string().required().max(10),
        }),

        params: Joi.object({
            id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),

    deleteVendor: validate({
        params: Joi.object({
            
            id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),
};
