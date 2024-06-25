const routes = require("express")();

routes.use("/role", require("./role.routes"));
routes.use("/user", require("./user.routes"));
routes.use("/vendor", require("./vendor.routes"));
routes.use("/category", require("./category.routes"));
routes.use("/product", require("./product.routes"));
routes.use("/inquiry", require("./inquiry.routes"));
routes.use("/setting", require("./vendorSiteSetting.routes"))

module.exports = routes;
