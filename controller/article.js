const fs = require('fs');
const path = require('path');
const articleService = require("../service/article");

// 获取文章列表（全部文章、通过分类、通过标题或关键词）
const getList = async ctx => {
    const { key, category, page } = ctx.query; //得到 [关键词] 或 [文章标题] 这种数据，?category=...&key=...
    if (!key && !category) {
        // 全部文章
        const articles = await articleService.getListAll(page);
        ctx.body = global.res.json(articles);
        ctx.status = 200;
    } else if (!key && category) {
        // 通过分类筛选文章
        const articles = await articleService.getListByCategory(category, page);
        ctx.body = global.res.json(articles);
        ctx.status = 200;
    } else if (key && !category) {
        // 通过标题或关键词筛选文章
        const articles = await articleService.getListByKey(key, page);
        ctx.body = global.res.json(articles);
        ctx.status = 200;
    } else {
        // 通过分类和标题、关键词筛选文章
        const articles = await articleService.getListByCategoryAndKey(category, key, page);
        ctx.body = global.res.json(articles);
        ctx.status = 200;
    }
};
// 获取一篇文章（通过id）
const getOne = async ctx => {
    const { id } = ctx.params;
    const article = await articleService.getOne(id);
    ctx.body = global.res.json(article);
    ctx.status = 200;
};
// 新建一篇文章
const create = async ctx => {
    const payload = ctx.request.body;
    let { title, content, description, keyword = "", cover = "", browse = 0, author = 'Gvonte', CategoryId } = payload;
    if (!title || !content || !description || !CategoryId) {
        throw new global.errors.ParameterException();
    }
    // 如果传进来的content不是字符串，而是对象（表示传的文件对象）
    if (typeof content === 'object') {
        content = fs.readFileSync(path.resolve(content.destination, content.filename)).toString();
    }
    const res = await articleService.create({ title, content, description, keyword, cover, browse, author, CategoryId });
    ctx.body = global.res.json(res);
    ctx.status = 200;
};
// 修改一篇文章
const edit = async ctx => {
    const { id } = ctx.params;
    const payload = ctx.request.body;
    const ary = ["title", "content", "description", "keyword", "cover", "browse", "author", "CategoryId"];
    Object.keys(payload).forEach(key => {
        ary.indexOf(key) === -1 ? delete payload[key] : null;
    });
    await articleService.edit(id, payload);
    ctx.body = global.res.success("修改文章成功！");
    ctx.status = 200;
};
// 删除一篇文章
const remove = async ctx => {
    const { id } = ctx.params;
    await articleService.remove(id);
    ctx.body = global.res.success("删除文章成功！");
    ctx.status = 200;
};
module.exports = { getList, getOne, create, edit, remove };