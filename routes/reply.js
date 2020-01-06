const Router = require("koa-router");
const router = new Router({ prefix: "/api/reply" });
const replyController = require("../controller/reply");
const jwtAuth = require("koa-jwt");
const secret = require("../utils/tokenSecret");

router.get("/", replyController.getAll); // 获取一篇评论的回复列表
router.get("/:id", replyController.getOne); // 获取一条回复（通过id）
router.post('/', jwtAuth({ secret }), replyController.create); // 新建一条回复
router.put('/:id', jwtAuth({ secret }), replyController.edit); // 修改一条回复
router.delete('/:id', jwtAuth({ secret }), replyController.remove); // 删除一条回复

module.exports = router;