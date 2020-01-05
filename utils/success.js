// 请求成功返回主体的数据结构
class Resolve {
    success(msg = 'success', errorCode = 0, code = 200) {
        return {
            msg,
            code,
            errorCode
        }
    }

    json(data, msg = 'success', errorCode = 0, code = 200) {
        return {
            code,
            msg,
            errorCode,
            data
        }
    }
}

module.exports = new Resolve();
