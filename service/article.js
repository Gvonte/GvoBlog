const Article = require("../model/article");
const PAGE_SIZE = 10; //每个分页的数量
const Sequelize = require("sequelize");
const { Op } = Sequelize;
const Category = require("../model/category");
const commentService = require("../service/comment");

// 获取文章列表（全部文章）
const getListAll = async page => {
    let articles;
    if (page) {
        articles = await Article.findAndCountAll({
            offset: (page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            attributes: ['browse', 'cover', 'description', 'author', 'title', 'id'],
            include: [{
                model: Category,
                attributes: ['name']
            }]
        });
    } else {
        articles = await Article.findAndCountAll({
            attributes: ['browse', 'cover', 'description', 'author', 'title', 'id'],
            include: [{
                model: Category,
                attributes: ['name']
            }]
        });
    }
    return articles
};
// 获取文章列表（通过分类）
const getListByCategory = async (CategoryId, page) => {
    let articles;
    if (page) {
        articles = await Article.findAndCountAll({
            where: { CategoryId },
            attributes: ['browse', 'cover', 'description', 'author', 'title', 'id'],
            offset: (page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            include: [{
                model: Category,
                attributes: ['name']
            }]
        });
    } else {
        articles = await Article.findAndCountAll({
            where: { CategoryId },
            attributes: ['browse', 'cover', 'description', 'author', 'title', 'id'],
            include: [{
                model: Category,
                attributes: ['name']
            }]
        });
    }
    return articles
};
// 获取文章列表（通过标题或关键词）
const getListByKey = async (key, page) => {
    let articles;
    if (page) {
        articles = await Article.findAndCountAll({
            where: {
                [Op.or]: [{ title: { [Op.like]: `%${key}%` } }, { keyword: { [Op.like]: `%${key}%` } }]
            },
            attributes: ['browse', 'cover', 'description', 'author', 'title', 'id'],
            offset: (page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            include: [{
                model: Category,
                attributes: ['name']
            }]
        });
    } else {
        articles = await Article.findAndCountAll({
            where: {
                [Op.or]: [{ title: { [Op.like]: `%${key}%` } }, { keyword: { [Op.like]: `%${key}%` } }]
            },
            attributes: ['browse', 'cover', 'description', 'author', 'title', 'id'],
            include: [{
                model: Category,
                attributes: ['name']
            }]
        });
    }
    return articles
};
// 获取文章列表（通过分类和标题或关键词）
const getListByCategoryAndKey = async (CategoryId, key, page) => {
    let articles;
    if (page) {
        articles = await Article.findAndCountAll({
            where: {
                CategoryId,
                [Op.or]: [{ title: { [Op.like]: `%${key}%` } }, { keyword: { [Op.like]: `%${key}%` } }]
            },
            attributes: ['browse', 'cover', 'description', 'author', 'title', 'id'],
            offset: (page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
            include: [{
                model: Category,
                attributes: ['name']
            }]
        });
    } else {
        articles = await Article.findAndCountAll({
            where: {
                CategoryId,
                [Op.or]: [{ title: { [Op.like]: `%${key}%` } }, { keyword: { [Op.like]: `%${key}%` } }]
            },
            attributes: ['browse', 'cover', 'description', 'author', 'title', 'id'],
            include: [{
                model: Category,
                attributes: ['name']
            }]
        });
    }
    return articles
};
// 获取一篇文章（通过id）（还获取了文章的评论）
const getOne = async id => {
    const article = await Article.findOne({
        where: { id },
        include: [{
            model: Category,
            attributes: ['name']
        }]
    });
    if (!article) {
        throw new global.errors.NotFound("文章不存在");
    }
    article.browse++;
    article.save();
    const comment = await commentService.getAll(id);
    return { article, comment };
};
// 新建一篇文章
const create = async payload => {
    const article = await Article.findOne({ where: { title: payload.title } });
    if (article) {
        throw new global.errors.Existing("文章已存在");
    }
    return await Article.create(payload);
};
// 修改一篇文章
const edit = async (id, payload) => {
    const article = await Article.findOne({ where: { id } });
    if (!article) {
        throw new global.errors.NotFound("文章不存在");
    }
    Object.keys(payload).forEach(key => {
        article[key] = payload[key];
    });
    article.save();
};
// 删除一篇文章
const remove = async id => {
    const article = await Article.findOne({ where: { id } });
    if (!article) {
        throw new global.errors.NotFound("文章不存在");
    }
    article.destroy();
};
module.exports = { getListAll, getListByCategory, getListByKey, getListByCategoryAndKey, getOne, create, edit, remove };