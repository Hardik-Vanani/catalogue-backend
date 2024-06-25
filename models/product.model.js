const { Schema, model, default: mongoose } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        friendlyURL: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        price: {
            type: Number,
            min: 0,
        },
        shortDescription: String,
        longDescription: String,
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "category",
        },
        productImage: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        totalViews: {
            type: Number,
            default: 0,
        },
        totalInquiry: {
            type: Number,
            default: 0,
        },
        vendorId: {
            type: Schema.Types.ObjectId,
            ref: "vendor",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("product", schema, "product");
