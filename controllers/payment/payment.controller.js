const DB = require("../../models");
const response = require("../../helper/response.helper");

module.exports = {
    getPaymentDetails: async (req, res) => {
        try {
            // ADMIN : Get payment details of all the vendors
            if (req.user.role == "Admin") {
                const paymentDetails = await DB.payment.find(req.query);
                return response.OK({ res, count: paymentDetails.length, payload: { paymentDetails } });
            }

            // VENDOR : Specific Vendor Access
            else if (req.user.role == "Vendor") {
                const vendor = await DB.vendor.findOne({ userId: req.user.id });
                const paymentDetails = await DB.payment.findOne({ vendorId: vendor.id });
                return response.OK({ res, payload: { paymentDetails } });
            }
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    createPaymentDetail: async (req, res) => {
        try {
            const vendor = await DB.vendor.findOne({ userId: req.user.id });

            const existedDetail = await DB.payment.findOne({ vendorId: vendor.id });
            // if (existedDetail) {
            //     return response.EXISTED({ res });
            // }

            const createPaymentDetail = await DB.payment.create({ ...req.body, vendorId: vendor.id });
            return response.CREATED({ res, payload: { createPaymentDetail } });
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    updatePaymentDetail: async (req, res) => {
        try {
            const vendor = await DB.vendor.findOne({ userId: req.user.id });

            const updatePaymentDetail = await DB.payment.findByIdAndUpdate(
                {
                    _id: req.params.id,
                    vendorId: vendor.id,
                },
                { ...req.body, vendorId: vendor.id }
            );
            return response.OK({ res, payload: { updatePaymentDetail } });
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    deletePaymentDetail: async (req, res) => {
        try {
            // ADMIN: Delete vendor
            if (req.user.role === "Admin") {
                const paymentDetailsDelete = await DB.payment.findByIdAndDelete({ _id: req.params.id });
                if (!paymentDetailsDelete) return response.NOT_FOUND({ res });
                return response.OK({ res, payload: { paymentDetailsDelete } });
            }

            // VENDOR: Delete specific Vendor
            else if (req.user.role === "Vendor") {
                const vendor = await DB.vendor.findOne({ userId: req.user.id });
                const paymentDetailsDelete = await DB.payment.findByIdAndDelete({ _id: req.params.id, vendorId: vendor.id });

                if (!paymentDetailsDelete) return response.NOT_FOUND({ res });
                return response.OK({ res, payload: { paymentDetailsDelete } });
            }
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },
};
