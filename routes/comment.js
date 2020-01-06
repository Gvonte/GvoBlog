const Router = require("koa-router");
const router = new Router({ prefix: "/api/comment" });
const commentController = require("../controller/comment");
const jwtAuth = require("koa-jwt");
const secret = require("../utils/tokenSecret");

router.get("/", commentController.getAll); // 获取一篇文章的评论列表
router.get("/:id", commentController.getOne); // 获取一条评论（通过id）
router.post('/', jwtAuth({ secret }), commentController.create); // 新建一条评论
router.put('/:id', jwtAuth({ secret }), commentController.edit); // 修改一条评论
router.delete('/:id', jwtAuth({ secret }), commentController.remove); // 删除一条评论

module.exports = router;