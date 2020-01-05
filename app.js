const Koa = require('koa');
const app = new Koa();
const errors = require('./utils/errors');
const res = require('./utils/success');
const err = require("./middleware/error");
const static = require("koa-static");
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const advertise = require("./routes/advertise");
const category = require("./routes/category");
const user = require("./routes/user");
const article = require("./routes/article");
const comment = require("./routes/comment");
const reply = require("./routes/reply");
const upload = require("./routes/upload");

// 将各种错误类型、成功主体注入全局变量
global.errors = errors;
global.res = res;
// 错误处理
app.use(err);
// 静态文件服务
app.use(static(__dirname + '/public'));
// 解决跨域
app.use(cors());
// 处理post传参
app.use(bodyParser());

// 路由
app.use(advertise.routes());
app.use(category.routes());
app.use(user.routes());
app.use(article.routes());
app.use(comment.routes());
app.use(reply.routes());
app.use(upload.routes());

app.listen(3000, () => {
    console.log("服务器启动成功！");
})