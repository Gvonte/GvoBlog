const Router = require("koa-router");
const router = new Router();
const userController = require("../controller/user");
const jwtAuth = require("koa-jwt");
const secret = require("../utils/tokenSecret");

router.post("/login", userController.login); // 登录
router.post("/register", userController.register); // 注册
router.get("/getUser", jwtAuth({ secret }), userController.getUser); // 获取用户信息

module.exports = router;