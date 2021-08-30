const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建一个请求体的结构
const ProfileSchema = new Schema({
    type: {
        type: String,
    },
    describe: {
        type: String,
    },
    income: {
        type: String,
        require: true
    },
    expend: {
        type: String,
        require: true
    },
    cash: {
        type: String,
        require: true
    },
    remark: {
        type: String,
    },

    identity: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

// 将该模块导出

module.exports = Profile = mongoose.model("profile", ProfileSchema);