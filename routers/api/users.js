// @login & register
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');   // 该模块能对密码进行加密
const gravatar = require('gravatar.js');  // 该模块是头像处理模块
const jwt = require('jsonwebtoken'); // 该模块用于产生token
const passport = require("passport");

const User = require('../../models/User');
const keys = require('../../config/keys');

// $route GET /api/users/test
// @desc 返回请求的json数据
// @access public
router.get('/test', (req, res) => {
    res.json({ msg: "login works" })
})

// $route POST /api/users/register
// @desc 返回请求的json数据
// @access public
router.post('/register', (req, res) => {
    // console.log(req.body);

    // 首先查询数据库中是否拥有邮箱
    User.findOne({ email: req.body.email })
        .then((user) => {
            // 如果发现已经存在邮箱了就返回400错误，错误信息为邮箱已被注册
            if (user) {
                return res.status(400).json({ email: '邮箱已被注册' })
            } else {
                // 如果数据库中没有发现所填写的邮箱就创建一个请求体
                // 这个请求体中包括如下内容

                // 通过gravatar处理邮箱的头像，不传的话默认是mm，这个mm会是一个头像的背景图
                const avatar = gravatar.url(req.body.email, { defaultIcon: 'mm', size: 200 });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                })
                // 进行密码加密，使用方法主要看npm
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // 这里的hash就是加密之后的结果
                        newUser.password = hash;

                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
})

// $route POST /api/users/login
// @desc 返回token jwt passport
// @access public

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // 查询数据库
    User.findOne({ email })
        .then((user) => {
            // 如果用户不存在就返回404状态码，并给出提示信息：邮箱不存在
            if (!user) {
                return res.status(404).json({ email: '邮箱不存在' })
            }
            // 密码匹配
            bcrypt.compare(password, user.password)
                .then((isMath) => {
                    if (isMath) {

                        // ---------------
                        // jwt.sign("规则", "加密名字", "过期时间,一个对象，时间是秒为单位,3600秒就是一个小时", "（箭头）函数,第一个参数为err信息，第二个参数为生成的token");
                        const rule = { id: user.id, name: user.name };
                        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        });

                        // res.json({ msg: 'success' })
                        // ---------------
                    } else {
                        return res.status(400).json({ password: '密码错误' })
                    }
                })
        })
})

// $route GET /api/users/current
// @desc 返回current user
// @access private

// .get()有三个参数，它的第二个参数就是验证token的方法，使用passport和passport-jwt进行验证
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router;