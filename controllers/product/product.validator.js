const { validate } = require("express-validation");
const Joi = require("joi");

module.exports = {
    createProduct: validate({
        body: Joi.object({
            name: Joi.string().required(),
            price: Joi.number().optional(),
            shortDescription: Joi.string().optional(),
            longDescription: Joi.string().optional(),
            categoryName: Joi.string().optional(),
        }),
    }),

    updateProduct: validate({
        body: Joi.object({
            name: Joi.string().required(),
            price: Joi.number().optional(),
            shortDescription: Joi.string().optional(),
            longDescription: Joi.string().optional(),
            categoryName: Joi.string().optional(),
        }),

        params: Joi.object({
            id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),

    deleteProduct: validate({
        params: Joi.object({
            id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),
};
