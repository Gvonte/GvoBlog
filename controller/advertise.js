const advertiseService = require("../service/advertise");
// 获取广告列表
const getAll = async ctx => {
    const ads = await advertiseService.getAll();
    ctx.response.status = 200;
    ctx.body = global.res.json(ads);
}
// 获取一条广告
const getOne = async ctx => {
    const { id } = ctx.params;
    const ad = await advertiseService.getOne(id);
    ctx.response.status = 200;
    ctx.body = global.res.json(ad);
}
// 新增一条广告
const create = async ctx => {
    const content = ctx.request.body;
    if (!content.title || !content.link) {
        throw new global.errors.ParameterException();
    }
    await advertiseService.create(content);
    ctx.response.status = 200;
    ctx.body = global.res.success('新增广告成功！');
}
// 修改一条广告
const edit = async ctx => {
    const content = ctx.request.body;
    const id = ctx.params.id;
    await advertiseService.edit(id, content);
    ctx.response.status = 200;
    ctx.body = global.res.success('修改广告成功！');
}
// 删除一条广告
const remove = async ctx => {
    const { id } = ctx.params;
    await advertiseService.remove(id);
    ctx.response.status = 200;
    ctx.body = global.res.success('删除广告成功！');
}

module.exports = { getAll, getOne, create, edit, remove }