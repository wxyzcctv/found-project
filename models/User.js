const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建一个请求体的结构
const UserSchema = new Schema({
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
    date: {
        type: Date,
        default: Date.now
    },
})

// 将该模块导出

module.exports = User = mongoose.model("user", UserSchema);