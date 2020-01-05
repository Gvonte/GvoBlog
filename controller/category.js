const categoryService = require("../service/category");
// 获取分类列表
const getAll = async ctx => {
    const categories = await categoryService.getAll();
    ctx.response.status = 200;
    ctx.body = global.res.json(categories);
}
// 获取一个分类
const getOne = async ctx => {
    const { id } = ctx.params;
    const category = await categoryService.getOne(id);
    ctx.response.status = 200;
    ctx.body = global.res.json(category);
}
// 新增一个分类
const create = async ctx => {
    const { name } = ctx.request.body;
    if (!name) {
        throw new global.errors.ParameterException();
    }
    await categoryService.create({name});
    ctx.response.status = 200;
    ctx.body = global.res.success('新增分类成功！');
}
// 修改一个分类
const edit = async ctx => {
    const payload = ctx.request.body;
    const id = ctx.params.id;
    await categoryService.edit(id, payload);
    ctx.response.status = 200;
    ctx.body = global.res.success('修改分类成功！');
}
// 删除一个分类
const remove = async ctx => {
    const { id } = ctx.params;
    await categoryService.remove(id);
    ctx.response.status = 200;
    ctx.body = global.res.success('删除分类成功！');
}

module.exports = { getAll, getOne, create, edit, remove }