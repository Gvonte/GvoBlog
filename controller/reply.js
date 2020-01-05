const replyService = require("../service/reply");

// 获取一条评论的回复列表
const getAll = async ctx => {
    const { comment, page } = ctx.query;
    if (!comment) {
        throw new global.errors.ParameterException();
    }
    const replys = await replyService.getAll(comment, page);
    ctx.body = global.res.json(replys);
    ctx.status = 200;
};
// 获取一条回复（通过id）
const getOne = async ctx => {
    const { id } = ctx.params;
    const reply = await replyService.getOne(id);
    ctx.body = global.res.json(reply);
    ctx.status = 200;
};
// 新建一条回复
const create = async ctx => {
    const { content, CommentId } = ctx.request.body;
    const UserId = JSON.parse(ctx.state.user.data).id;
    if (!content || !CommentId) {
        throw new global.errors.ParameterException();
    }
    await replyService.create({ content, CommentId, UserId });
    ctx.body = global.res.success("新增回复成功！");
    ctx.status = 200;
};
// 修改一条回复
const edit = async ctx => {
    const { id } = ctx.params;
    const payload = ctx.request.body;
    await replyService.edit(id, payload);
    ctx.body = global.res.success("修改回复成功！");
    ctx.status = 200;
};
// 删除一条回复
const remove = async ctx => {
    const { id } = ctx.params;
    await replyService.remove(id);
    ctx.body = global.res.success("删除回复成功！");
    ctx.status = 200;
};
module.exports = { getAll, getOne, create, edit, remove };