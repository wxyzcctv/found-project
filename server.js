const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

// 引入user.js
const user = require('./routers/api/users');
// 引入profiles
const profile = require('./routers/api/profiles')

// DB config
const db = require("./config/keys").mongoURI;

// Connect to mongodb
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 初始化passport
app.use(passport.initialize());
// 使用require的方式将passport传入到配置文件中，这样就在配置文件里面写passpost
require('./config/passport')(passport);

// app.get("/", (req, res) => {
//     res.send('Hello World!')
// })

// 使用routes
app.use("/api/users", user)
app.use("/api/profiles", profile)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})