const Comment = require("../model/comment");
const PAGE_SIZE = 10; //每个分页的数量
const User = require("../model/user");
const Reply = require("../model/reply");
const { removeByCommentId } = require("../service/reply");

// 获取一篇文章的评论列表（包括评论的回复）
const getAll = async (ArticleId, page) => {
    let comments;
    if (page) {
        comments = await Comment.findAndCountAll({
            where: { ArticleId },
            limit: PAGE_SIZE,
            offset: PAGE_SIZE * (page - 1),
            // include表示关联查询
            include: [{
                model: User,
                attributes: ['username'],
            }, {
                model: Reply,
                attributes: ['content','updatedAt'],
                include: [{
                    model: User,
                    attributes: ['username']
                }]
            }],
            order: [['updatedAt', 'DESC']], //排序
            distinct: true //解决count字段数量不对的问题
        });
    } else {
        comments = await Comment.findAndCountAll({
            where: { ArticleId },
            include: [{
                model: User,
                attributes: ['username'],
            }, {
                model: Reply,
                attributes: ['content','updatedAt'],
                include: [{
                    model: User,
                    attributes: ['username']
                }]
            }],
            order: [['updatedAt', 'DESC']], //排序
            distinct: true //解决count字段数量不对的问题
        });
    }
    return comments
};
// 获取一条评论（通过id）
const getOne = async id => {
    const comment = await Comment.findOne({
        where: { id },
        include: [{
            model: User,
            attributes: ['username'],
        }, {
            model: Reply,
            attributes: ['content'],
            include: [{
                model: User,
                attributes: ['username']
            }]
        }]
    });
    if (!comment) {
        throw new global.errors.NotFound("评论不存在");
    }
    return comment;
};
// 新建一条评论
const create = async payload => {
    await Comment.create(payload);
};
// 修改一条评论
const edit = async (id, payload) => {
    const comment = await Comment.findOne({ where: { id } });
    if (!comment) {
        throw new global.errors.NotFound("评论不存在");
    }
    const { content } = payload;
    content ? comment.content = content : null;
    comment.save();
};
// 删除一条评论
const remove = async id => {
    const comment = await Comment.findOne({ where: { id } });
    if (!comment) {
        throw new global.errors.NotFound("评论不存在");
    }
    await removeByCommentId(id);
    comment.destroy();
};
module.exports = { getAll, getOne, create, edit, remove };