const DB = require("../../models");
const response = require("../../helper/response.helper");

module.exports = {
    getVendor: async (req, res) => {
        try {
            // ADMIN: All Vendor Access
            if (req.user.role === "Admin") {
                const vendor = await DB.vendor.find(req.query);
                return response.OK({ res, count: vendor.length, payload: { vendor } });
            }

            // VENDOR: Specific Vendor Access
            else if (req.user.role === "Vendor") {
                const vendor = await DB.vendor.findOne({ userId: req.user.id });
                return response.OK({ res, payload: { vendor } });
            }

            return response.OK({ res });
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    updateVendor: async (req, res) => {
        try {
            const { name, address, mobileNo } = req.body;
            if (!name || !address || !mobileNo) return response.ALL_REQUIRED({ res });

            const vendorUpdate = await DB.vendor.findByIdAndUpdate(
                {
                    _id: req.params.id,
                    userId: req.user.id,
                },
                req.body,
                { new: true }
            );

            return response.OK({ res, payload: { vendorUpdate } });
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    deleteVendor: async (req, res) => {
        try {
            // ADMIN: Delete Vendor
            if (req.user.role === "Admin") {
                const vendorDelete = await DB.vendor.findByIdAndDelete({ _id: req.params.id });
                if (!vendorDelete) return response.NOT_FOUND({ res });
                return response.OK({ res, payload: { vendorDelete } });
            }

            // VENDOR: Delete specific Vendor
            else if (req.user.role === "Vendor") {
                const vendorDelete = await DB.vendor.findByIdAndDelete({ _id: req.params.id, userId: req.user.id });
                if (!vendorDelete) return response.NOT_FOUND({ res });
                return response.OK({ res, payload: { vendorDelete } });
            }
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },
};
