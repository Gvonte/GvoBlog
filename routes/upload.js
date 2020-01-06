const Router = require("koa-router");
const router = new Router({ prefix: "/api/upload" });
const uploadController = require("../controller/upload");
const jwtAuth = require("koa-jwt");
const secret = require("../utils/tokenSecret");
const upload = require("koa-multer")({ dest: "./public/doc" });

router.post("/", jwtAuth({ secret }), upload.single("file"), uploadController.upload); // 上传一个文件

module.exports = router;