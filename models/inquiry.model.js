const { Schema, model, default: mongoose } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: Number,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
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

module.exports = model("inquiry", schema, "inquiry");
