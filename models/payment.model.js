const { Schema, model, default: mongoose } = require("mongoose");

const schema = new Schema(
    {
        bankName: {
            type: String,
            required: true,
            trim: true,
        },
        accountHolderName: {
            type: String,
            required: true,
        },
        accountNumber: {
            type: String,
            required: true,
        },
        accoutType: {
            type: String,
            required: true,
        },
        IFSCcode: {
            type: String,
            required: true,
        },
        GSTCompany: {
            type: String,
            required: true,
        },
        GSTAddress: {
            type: String,
            required: true,
        },
        GSTNumber: {
            type: String,
            required: true,
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

module.exports = model("paymentDetails", schema, "paymentDetails");
