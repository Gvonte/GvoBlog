const Router = require("koa-router");
const router = new Router({ prefix: "/article" });
const articleController = require("../controller/article");
const jwtAuth = require("koa-jwt");
const secret = require("../utils/tokenSecret");

router.get("/", articleController.getList); // 获取文章列表（全部文章、分类文章?category=..通过标题、关键词?key=..）
router.get("/:id", articleController.getOne); // 获取一篇文章（通过id）
router.post('/', jwtAuth({ secret }), articleController.create); // 新建一篇文章
router.put('/:id', jwtAuth({ secret }), articleController.edit); // 修改一篇文章
router.delete('/:id', jwtAuth({ secret }), articleController.remove); // 删除一篇文章

module.exports = router;