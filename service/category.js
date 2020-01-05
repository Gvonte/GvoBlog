const Category = require("../model/category");
// 获取分类列表
const getAll = async () => {
    console.log(1);
    
    const category = await Category.findAll();
    return category;
}
// 获取一个分类
const getOne = async id => {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
        throw new global.errors.NotFound('没有找到该分类');
    }
    return category;
}
// 新增一个分类
const create = async content => {
    // 检查分类是否存在
    const category = await Category.findOne({
        where: {
            name: content.name
        }
    });
    if (category) {
        throw new global.errors.Existing('分类已存在');
    }
    Category.create(content);
}
// 修改一个分类
const edit = async (id, editContent) => {
    const category = await Category.findOne({ where: { id } });
    if (!category) {
        throw new global.errors.NotFound('没有找到该分类');
    }
    const { name } = editContent;
    name ? category.name = name : null;
    category.save();
}
// 删除一个分类
const remove = async id => {
    const ad = await Category.findOne({ where: { id } });
    if (!ad) {
        throw new global.errors.NotFound('没有找到该category');
    }
    ad.destroy();
}
module.exports = { getAll, getOne, create, edit, remove }