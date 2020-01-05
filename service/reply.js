const Reply = require("../model/reply");
const PAGE_SIZE = 10; //每个分页的数量
const User = require("../model/user");
const Comment = require("../model/comment");

// 获取一条评论的回复列表
const getAll = async (CommentId, page) => {
    let replys;
    if (page) {
        replys = await Reply.findAndCountAll({
            where: { CommentId },
            limit: PAGE_SIZE,
            offset: PAGE_SIZE * (page - 1),
            include: [{
                model: User,
                attributes: ['username'],
            }],
            order: [['updatedAt', 'DESC']] //排序
        });
    } else {
        replys = await Reply.findAndCountAll({
            where: { CommentId },
            include: [{
                model: User,
                attributes: ['username'],
            }],
            order: [['updatedAt', 'DESC']] //排序
        });
    }
    return replys
};
// 获取一条回复（通过id）
const getOne = async id => {
    const reply = await Reply.findOne({
        where: { id },
        include: [{
            model: User,
            attributes: ['username']
        }, {
            model: Comment,
            attributes: ['content'],
            include: [{
                model: User,
                attributes: ['username']
            }]
        }]
    });
    if (!reply) {
        throw new global.errors.NotFound("回复不存在");
    }
    return reply;
};
// 新建一条回复
const create = async payload => {
    await Reply.create(payload);
};
// 修改一条回复
const edit = async (id, payload) => {
    const reply = await Reply.findOne({ where: { id } });
    if (!reply) {
        throw new global.errors.NotFound("回复不存在");
    }
    const { content } = payload;
    content ? reply.content = content : null;
    reply.save();
};
// 删除一条回复（通过id）
const remove = async id => {
    const reply = await Reply.findOne({ where: { id } });
    if (!reply) {
        throw new global.errors.NotFound("回复不存在");
    }
    await reply.destroy();
};
// 删除一条评论下的回复（通过CommentId）
const removeByCommentId = async CommentId => {
    const replys = await Reply.findAll({ where: { CommentId } });
    replys.forEach(async reply => {
        await reply.destroy();
    });
};
module.exports = { getAll, getOne, create, edit, remove, removeByCommentId };