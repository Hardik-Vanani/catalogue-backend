const DB = require("../../models");
const response = require("../../helper/response.helper");

module.exports = {
    getSetting: async (req, res) => {
        try {
            // ADMIN : Get site settings of all the vendors
            if (req.user.role == "Admin") {
                const siteSetting = await DB.siteSetting.find(req.query);
                return response.OK({ res, count: siteSetting.length, payload: { siteSetting } });
            }

            // VENDOR : Get site settings of the specific vendor
            if (req.user.role == "Vendor") {
                const vendor = await DB.vendor.findOne({ userId: req.user.id });
                const siteSetting = await DB.siteSetting.findOne({ vendorId: vendor.id });

                return response.OK({ res, payload: { siteSetting } });
            }
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    createSetting: async (req, res) => {
        try {
            const { email } = req.body;
            const findEmail = await DB.siteSetting.findOne({ email });
            if (findEmail) {
                return response.EXISTED({ res });
            }
            
            const vendor = await DB.vendor.findOne({ userId: req.user.id });

            const createSetting = await DB.siteSetting.create({
                ...req.body,
                logo: req.file.path,
                vendorId: vendor.id,
            });
            return response.CREATED({ res, payload: { createSetting } });
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    updateSetting: async (req, res) => {
        try {
            const vendor = await DB.vendor.findOne({ userId: req.user.id });
            const updateSetting = await DB.siteSetting.findByIdAndUpdate(
                {
                    _id: req.params.id,
                    vendorId: vendor.id,
                },
                {
                    ...req.body,
                    logo: req.file.path,
                },
                { new: true }
            );
            return response.OK({ res, payload: { updateSetting } });
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    deleteSetting: async (req, res) => {
        try {
            // ADMIN : Delete site setting of vendor
            if (req.user.role == "Admin") {
                const deleteSetting = await DB.siteSetting.findByIdAndDelete({ _id: req.params.id });
                if (!deleteSetting) return response.NOT_FOUND({ res });

                return response.OK({ res, payload: { deleteSetting } });
            }
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },
};
