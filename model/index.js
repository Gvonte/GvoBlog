const Sequelize = require("sequelize");
const sequelize = new Sequelize("gvoblog", "root", "admin", {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false
});
module.exports = sequelize;