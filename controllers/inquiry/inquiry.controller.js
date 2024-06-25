const DB = require("../../models");
const response = require("../../helper/response.helper");

module.exports = {
    getInquiry: async (req, res) => {
        try {
            const inquiryData = await DB.inquiry.find(req.query);
            return response.OK({ res, count: inquiryData.length, payload: { inquiryData } });
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    createInquiry: async (req, res) => {
        try {
            const payload = req.body;

            const vendor = await DB.vendor.findOne({ userId: req.user.id });

            const inquiryData = await DB.inquiry.create({ ...payload, vendorId: vendor.id });
            return response.CREATED({ res, payload: { inquiryData } });
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },
};
