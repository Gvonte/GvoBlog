const Advertise = require("../model/advertise");
// 获取广告列表
const getAll = async () => {
    const ad = await Advertise.findAll();
    return ad;
}
// 获取一条广告
const getOne = async id => {
    const ad = await Advertise.findOne({ where: { id } });
    if (!ad) {
        throw new global.errors.NotFound('没有找到该广告');
    }
    return ad;
}
// 新增一条广告
const create = async content => {
    // 检查广告是否存在
    const ad = await Advertise.findOne({
        where: {
            title: content.title
        }
    });
    if (ad) {
        throw new global.errors.Existing('广告已存在');
    }
    await Advertise.create(content);
}
// 修改一条广告
const edit = async (id, editContent) => {
    const ad = await Advertise.findOne({ where: { id } });
    if (!ad) {
        throw new global.errors.NotFound('没有找到该广告');
    }
    const { title, link } = editContent;
    title ? ad.title = title : null;
    link ? ad.link = link : null;
    await ad.save();
}
// 删除一条广告
const remove = async id => {
    const ad = await Advertise.findOne({ where: { id } });
    if (!ad) {
        throw new global.errors.NotFound('没有找到该广告');
    }
    await ad.destroy();
}
module.exports = { getAll, getOne, create, edit, remove }