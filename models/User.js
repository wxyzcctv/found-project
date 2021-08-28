const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建一个请求体的结构
const UserSchema = new Schema({
    // 请求体的构建中包括:姓名,邮箱.密码,头像,日期(默认为当前时刻)
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
    },
    identity: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

// 将该模块导出

module.exports = User = mongoose.model("user", UserSchema);