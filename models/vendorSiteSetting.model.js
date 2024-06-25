const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        directProductListings: {
            type: Boolean,
            default: false,
        },
        logo: {
            type: String,
            default: null,
        },
        color: {
            type: String,
            default: "#FFFFFF",
        },
        facebook: String,
        linkedin: String,
        instagram: String,
        twitter: String,
        whatsapp: String,
        youtube: String,
        pinterest: String,
        googleBusiness: String,
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: [true, "Already existed Email Address."],
        },
        mainWeb: {
            type: String,
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
module.exports = model("siteSetting", schema, "siteSetting");
