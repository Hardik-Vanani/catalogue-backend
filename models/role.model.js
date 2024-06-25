const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("role", schema, "role");
