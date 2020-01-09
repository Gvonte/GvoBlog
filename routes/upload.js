const Router = require("koa-router");
const router = new Router({ prefix: "/api" });
const uploadController = require("../controller/upload");
const path = require("path");
const jwtAuth = require("koa-jwt");
const secret = require("../utils/tokenSecret");
const upload1 = require("koa-multer")({ dest: "./public/doc" });
const upload2 = require("koa-multer")({ dest: "./public/img" });

router.post("/upload", jwtAuth({ secret }), upload1.single("file"), uploadController.upload); // 上传一个文件
router.post("/uploadImg", jwtAuth({ secret }), upload2.single("file"), uploadController.upload); // 上传一张图片

module.exports = router;