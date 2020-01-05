const Router = require("koa-router")
const router = new Router({ prefix: "/advertise" });
const advertiseController = require("../controller/advertise");
const jwtAuth = require("koa-jwt");
const secret = require("../utils/tokenSecret");

router.get("/", advertiseController.getAll); // 获取广告列表
router.get("/:id", advertiseController.getOne); // 获取一条广告
router.post('/', jwtAuth({ secret }), advertiseController.create); // 新建一条广告
router.put('/:id', jwtAuth({ secret }), advertiseController.edit); // 修改一条广告
router.delete('/:id', jwtAuth({ secret }), advertiseController.remove); // 删除一条广告

module.exports = router;