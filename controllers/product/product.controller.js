const DB = require("../../models");
const response = require("../../helper/response.helper");
const generateProductURL = require("../../helper/generateURL.helper");

module.exports = {
    getProducts: async (req, res) => {
        try {
            // ADMIN : Fetch all products
            if (req.user.role === "Admin") {
                const productData = await DB.product.find(req.query).populate({
                    path: "categoryId",
                    select: "-vendorId -createdAt -updatedAt",
                    populate: {
                        path: "parentId",
                        select: "-vendorId -createdAt -updatedAt -parentId",
                    },
                });

                return response.OK({ res, count: productData.length, payload: { productData } });
            }

            // VENDOR : Fetch products specific to vendor
            else if (req.user.role === "Vendor") {
                const vendor = await DB.vendor.findOne({ userId: req.user.id });

                const productData = await DB.product.find({ ...req.query, vendorId: vendor.id }).populate({
                    path: "categoryId",
                    select: "-vendorId -createdAt -updatedAt",
                    populate: {
                        path: "parentId",
                        select: "-vendorId -createdAt -updatedAt -parentId",
                    },
                });

                return response.OK({ res, count: productData.length, payload: { productData } });
            }

            //CUSTOMER : Fetch all products
            else if (req.user.role == "Customer") {
                const productData = await DB.product.find(req.query).populate({
                    path: "categoryId",
                    select: "-vendorId -createdAt -updatedAt",
                    populate: {
                        path: "parentId",
                        select: "-vendorId -createdAt -updatedAt -parentId",
                    },
                });
                return response.OK({ res, count: productData.length, payload: { productData } });
            }
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    createProduct: async (req, res) => {
        try {
            const { name, price, shortDescription, longDescription, categoryName } = req.body;

            if (categoryName) {
                const categoryData = await DB.category.findOne({ name: categoryName });
                if (!categoryData) return response.NOT_FOUND({ res });
                var parentData = categoryData.id;
            } else {
                var parentData = null;
            }

            const vendor = await DB.vendor.findOne({ userId: req.user.id });
            if (!vendor) return response.NOT_FOUND({ res });

            const producCreate = await DB.product.create({
                ...req.body,
                friendlyURL: generateProductURL(name),
                categoryId: parentData,
                productImage: req.file.path,
                vendorId: vendor.id,
            });
            if (!producCreate) return response.NOT_FOUND({ res });

            return response.CREATED({ res, payload: { producCreate } });
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { name, price, shortDescription, longDescription, categoryName, subCategoryName } = req.body;
            if (!name) return response.ALL_REQUIRED({ res });

            if (categoryName) {
                const categoryData = await DB.category.findOne({ name: categoryName });
                if (!categoryData) return response.NOT_FOUND({ res });
                var parentData = categoryData.id;
            } else {
                var parentData = null;
            }

            const vendor = await DB.vendor.findOne({ userId: req.user.id });
            if (!vendor) return response.NOT_FOUND({ res });

            const productUpdate = await DB.product.findByIdAndUpdate(
                {
                    _id: req.params.id,
                    vendorId: vendor.id,
                },
                {
                    ...req.body,
                    friendlyURL: generateProductURL(name),
                    categoryId: parentData,
                    productImage: req.file.path,
                },
                { new: true }
            );

            if (!productUpdate) return response.NOT_FOUND({ res });

            return response.OK({ res, payload: { productUpdate } });
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            //ADMIN : Delete Product
            if (req.user.role === "Admin") {
                const productDelete = await DB.product.findByIdAndDelete({ _id: req.params.id });
                if (!productDelete) return response.NOT_FOUND({ res });
            }

            // VENDOR : Delete Product by Vendor
            else if (req.user.role === "Vendor") {
                const vendor = await DB.vendor.findOne({ userId: req.user.id });

                const productDelete = await DB.product.findByIdAndDelete({ _id: req.params.id, vendorId: vendor.id });
                if (!productDelete) return response.NOT_FOUND({ res });

                return response.OK({ res, payload: { productDelete } });
            }
        } catch (error) {
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },
};
