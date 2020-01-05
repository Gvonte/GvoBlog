const commentService = require("../service/comment");

// 获取一篇文章的评论列表
const getAll = async ctx => {
    const { article, page } = ctx.query;
    if (!article) {
        throw new global.errors.ParameterException();
    }
    const comments = await commentService.getAll(article, page);
    ctx.body = global.res.json(comments);
    ctx.status = 200;
};
// 获取一条评论（通过id）
const getOne = async ctx => {
    const { id } = ctx.params;
    const comment = await commentService.getOne(id);
    ctx.body = global.res.json(comment);
    ctx.status = 200;
};
// 新建一条评论
const create = async ctx => {
    const { content, ArticleId } = ctx.request.body;
    const UserId = JSON.parse(ctx.state.user.data).id;
    if (!content || !ArticleId) {
        throw new global.errors.ParameterException();
    }
    await commentService.create({ content, ArticleId, UserId });
    ctx.body = global.res.success("新增评论成功！");
    ctx.status = 200;
};
// 修改一条评论
const edit = async ctx => {
    const { id } = ctx.params;
    const payload = ctx.request.body;
    await commentService.edit(id, payload);
    ctx.body = global.res.success("修改评论成功！");
    ctx.status = 200;
};
// 删除一条评论
const remove = async ctx => {
    const { id } = ctx.params;
    await commentService.remove(id);
    ctx.body = global.res.success("删除评论成功！");
    ctx.status = 200;
};
module.exports = { getAll, getOne, create, edit, remove };