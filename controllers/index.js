module.exports = {
    USER: {
        APIS: require("./user/user.controller"),
        VALIDATOR: require("./user/user.validator"),
    },
    ROLE: {
        APIS: require("./role/role.controller"),
        VALIDATOR: require("./role/role.validator"),
    },
    VENDOR: {
        APIS: require("./vendor/vendor.controller"),
        VALIDATOR: require("./vendor/vendor.validator"),
    },
    CATEGORY: {
        APIS: require("./category/category.controller"),
        VALIDATOR: require("./category/category.validator"),
    },
    PRODUCT: {
        APIS: require("./product/product.controller"),
        VALIDATOR: require("./product/product.validator"),
    },
    SITE_SETTING: {
        APIS: require("./site_setting/siteSetting.controller"),
        VALIDATOR: require("./site_setting/siteSetting.validator"),
    },
    INQUIRY: {
        APIS: require("./inquiry/inquiry.controller"),
        VALIDATOR: require("./inquiry/inquiry.validator"),
    },
    PAYMENT: {
        APIS: require("./payment/payment.controller"),
        VALIDATOR: require("./payment/payment.validator"),
    },
};
