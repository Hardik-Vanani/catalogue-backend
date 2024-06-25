const DB = require("../../models");
const response = require("../../helper/response.helper");

const generateProductURL = require("../../helper/generateURL.helper");

module.exports = {
    getCategory: async (req, res) => {
        try {
            // ADIMN : Fetch all categories
            if (req.user.role == "Admin") {
                const categoryData = await DB.category.find(req.query).populate({
                    path: "parentId",
                    select: "-createdAt -updatedAt -parentId",
                });

                return response.OK({ res, count: categoryData.length, payload: { categoryData } });
            }

            // VENDOR : Fetch category of specific vendor
            else if (req.user.role == "Vendor") {
                const vendor = await DB.vendor.findOne({ userId: req.user.id });

                const categoryData = await DB.category.find({ ...req.query, vendorId: vendor.id }).populate({
                    path: "parentId",
                    select: "-createdAt -updatedAt -parentId",
                });

                return response.OK({ res, count: categoryData.length, payload: { categoryData } });
            }

            // CUSTOMER : Fetch all categories
            else if (req.user.role == "Customer") {
                const categoryData = await DB.category.find(req.query).populate({
                    path: "parentId",
                    select: "-createdAt -updatedAt -parentId",
                });

                return response.OK({ res, count: categoryData.length, payload: { categoryData } });
            }
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    createCategory: async (req, res) => {
        try {
            const { name, categoryName } = req.body;

            if (categoryName) {
                const categoryData = await DB.category.findOne({ name: categoryName });
                if (!categoryData) return response.NOT_FOUND({ res });
                var parentCategory = categoryData.id;
            } else {
                var parentCategory = null;
            }

            const vendor = await DB.vendor.findOne({ userId: req.user.id });
            if (!vendor) return response.NOT_FOUND({ res });

            const categoryCreate = await DB.category.create({
                ...req.body,
                friendlyURL: generateProductURL(name),
                parentId: parentCategory,
                image: req.file.path,
                vendorId: vendor.id,
            });

            return response.CREATED({ res, payload: { categoryCreate } });
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const { name, categoryName } = req.body;
            if (!name) return response.ALL_REQUIRED({ res });

            if (categoryName) {
                const categoryData = await DB.category.findOne({ name: categoryName });
                var parentCategory = categoryData.id;
            } else {
                var parentCategory = null;
            }

            const vendor = await DB.vendor.findOne({ userId: req.user.id });
            if (!vendor) return response.NOT_FOUND({ res });

            const categoryUpdate = await DB.category.findByIdAndUpdate(
                {
                    _id: req.params.id,
                    vendorId: vendor.id,
                },
                {
                    ...req.body,
                    friendlyURL: generateProductURL(name),
                    parentId: parentCategory,
                    image: req.file.path,
                },
                { new: true }
            );
            if (!categoryUpdate) return response.NOT_FOUND({ res });

            return response.OK({ res, payload: { categoryUpdate } });
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            // ADMIN : Delete category
            if (req.user.role === "Admin") {
                const categoryDelete = await DB.category.findByIdAndDelete({ _id: req.params.id });
                if (!categoryDelete) return response.NOT_FOUND({ res });
            }

            // VENDOR : Delete category of specific vendor
            else if (req.user.role === "Vendor") {
                const vendor = await DB.vendor.findOne({ userId: req.user.id });

                const categoryDelete = await DB.category.findByIdAndDelete({ _id: req.params.id, vendorId: vendor.id });
                if (!categoryDelete) return response.NOT_FOUND({ res });

                return response.OK({ res, payload: { categoryDelete } });
            }
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },
};
