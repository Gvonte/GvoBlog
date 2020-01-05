const Sequelize = require("sequelize");
const sequelize = require("./index");
const { INTEGER, STRING } = Sequelize;
const User = require("./user")
const Comment = require("./comment")

const Reply = sequelize.define("Reply", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, },
    content: {
        type: STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "请输入评论内容" }
        }
    }
});
Reply.belongsTo(Comment);
Comment.hasMany(Reply);
Reply.belongsTo(User)
User.hasMany(Reply);
Reply.sync();

module.exports = Reply;