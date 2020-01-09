const path = require("path");
const fs = require("fs");
// 上传一个文件
const upload = async ctx => {
    // console.log(ctx.req.file); // 注意数据存储在原始请求中
    // console.log(ctx.req.body); // 注意数据存储在原始请求中

    const file = ctx.req.file;
    // 如果是图片，需要将图片的二进制文件存一份img格式的在/root/img目录下
    if (file.mimetype.indexOf('image') > -1) {
        fs.readFile(path.resolve(file.path), (err, data) => {
            fs.writeFileSync(`/root/img/${file.filename}.${file.originalname.split('.')[1]}`, data)
        })
    }

    ctx.response.status = 200;
    ctx.body = global.res.json({ file: ctx.req.file, body: ctx.req.body });
}

module.exports = { upload }