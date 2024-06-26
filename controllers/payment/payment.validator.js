const { validate } = require("express-validation");
const Joi = require("joi");

module.exports = {
    createPaymentDetail: validate({
        body: Joi.object({
            bankName: Joi.string().required(),
            accountHolderName: Joi.string().required(),
            accountNumber: Joi.string().required().max(12),
            accoutType: Joi.string().required(),
            IFSCcode: Joi.string().required().max(11),
            GSTCompany: Joi.string().required(),
            GSTAddress: Joi.string().required(),
            GSTNumber: Joi.string().required().max(15),
        }),
    }),

    updatePaymentDetail: validate({
        body: Joi.object({
            bankName: Joi.string().required(),
            accountHolderName: Joi.string().required(),
            accountNumber: Joi.string().required().max(12),
            accoutType: Joi.string().required(),
            IFSCcode: Joi.string().required().max(11),
            GSTCompany: Joi.string().required(),
            GSTAddress: Joi.string().required(),
            GSTNumber: Joi.string().required().max(15),
        }),

        params: Joi.object({
            id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),

    deletePaymentDetail: validate({
        params: Joi.object({
            id: Joi.string()
                .pattern(/^[0-9a-fA-F]{24}$/)
                .message("Invalid ObjectId")
                .required(),
        }),
    }),
};
