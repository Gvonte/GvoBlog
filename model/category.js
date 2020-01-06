const Sequelize = require("sequelize");
const sequelize = require("./index");
const { INTEGER, STRING } = Sequelize;

const Category = sequelize.define("Category", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "请输入分类名称" }
        }
    }
});
Category.sync();
// Category.sync().then(() => {
//     Category.bulkCreate([
//         { name: 'HTML' },
//         { name: 'CSS' },
//         { name: 'JavaScript' },
//         { name: 'Vue' },
//         { name: 'React' },
//         { name: 'NodeJS' },
//         { name: 'Webpack' },
//         { name: 'Web安全' },
//         { name: '性能优化' },
//         { name: '测试和错误监控' },
//         { name: '数据结构与算法' },
//         { name: '计算机网络' },
//         { name: '操作系统' },
//         { name: '面试' },
//         { name: '科技前瞻' }
//     ])
// });

module.exports = Category;