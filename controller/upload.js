// 上传一个文件
const upload = async ctx => {
    // console.log(ctx.req.file); // 注意数据存储在原始请求中
    // console.log(ctx.req.body); // 注意数据存储在原始请求中
    ctx.response.status = 200;
    ctx.body = global.res.json({ file: ctx.req.file, body: ctx.req.body });
}

module.exports = { upload }