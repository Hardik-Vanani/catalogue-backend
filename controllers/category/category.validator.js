const { validate } = require("express-validation");
const Joi = require("joi");

module.exports = {
    createCategory: validate({
        body: Joi.object({
            name: Joi.string().required(),
            categoryName: Joi.string().optional(),
        }),
    }),

    updateCategory: validate({
        body: Joi.object({
            name: Joi.string().required(),
            categoryName: Joi.string().optional(),
        }),

        params: Joi.object({
            id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),

    deleteCategory: validate({
        params: Joi.object({
            id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),
};
