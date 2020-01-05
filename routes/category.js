const Router = require("koa-router");
const router = new Router({ prefix: "/category" });
const categoryController = require("../controller/category");
const jwtAuth = require("koa-jwt");
const secret = require("../utils/tokenSecret");

router.get("/", categoryController.getAll); // 获取分类列表
router.get("/:id", categoryController.getOne); // 获取一个分类
router.post('/', jwtAuth({ secret }), categoryController.create); // 新建一个分类
router.put('/:id', jwtAuth({ secret }), categoryController.edit); // 修改一个分类
router.delete('/:id', jwtAuth({ secret }), categoryController.remove); // 删除一个分类

module.exports = router;