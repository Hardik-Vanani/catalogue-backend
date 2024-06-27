const DB = require("../../models");
const response = require("../../helper/response.helper");

module.exports = {
    createRole: async (req, res) => {
        try {
            // Create Role from the Admin side
            const createRole = await DB.role.create({ name: req.body.name });
            return response.CREATED({ res, payload: { createRole } });
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    getRole: async (req, res) => {
        try {
            const roleData = await DB.role.find();
            return response.OK({ res, count: roleData.length, payload: { roleData } });
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },
};
