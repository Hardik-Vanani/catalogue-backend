const { kMaxLength } = require("buffer");
const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        mobileNo: {
            type: Number,
            required: true,
        },
        subDomain: {
            type: String,
            required: true,
            unique: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("vendor", schema, "vendor");
