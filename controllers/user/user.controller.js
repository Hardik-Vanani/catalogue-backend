const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const response = require("../../helper/response.helper");
const DB = require("../../models");
const generateProperName = require("../../helper/generateURL.helper");
const roleController = require("../role/role.controller");

module.exports = {
    createUser: async (req, res) => {
        try {
            const { username, password, address, mobileNo } = req.body;

            const existingUser = await DB.user.findOne({ username });
            if (existingUser) return response.EXISTED({ res });

            const hashedPassword = await bcrypt.hash(password, 10);

            const role = await DB.role.findOne({ name: "Vendor" });
            if (!role) return response.NOT_FOUND({ res });

            const newUser = await DB.user.create({ username: generateProperName(username), password: hashedPassword, role: role.name });
            await DB.vendor.create({ name: generateProperName(username), address, mobileNo, subDomain: generateProperName(username), userId: newUser.id });

            const userData = {
                userId: newUser.id,
                username,
                password: hashedPassword,
                role: role.name,
                address,
                mobileNo,
            };

            return response.OK({ res, payload: { userData } });
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await DB.user.findOne({ username });
            if (!user) return response.NOT_FOUND({ res });

            const ismatch = await bcrypt.compare(password, user.password);
            if (!ismatch) return response.UNAUTHORIZED({ res });

            const id = user._id;
            const name = user.username;
            const role = user.role;

            const token = jwt.sign({ id, name, role }, process.env.SECRET_KEY, { expiresIn: "5d" });
            return response.OK({ res, payload: { id, name, role, token } });
        } catch (error) {
            console.error(error);
            return response.INTERNAL_SERVER_ERROR({ res });
        }
    },
};
