const express = require("express");
const mongoose = require('mongoose');
const app = express();

// 引入user.js
const user = require('./routers/api/users')

// DB config
const db = require("./config/keys").mongoURI;

// Connect to mongodb
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))




app.get("/", (req, res) => {
    res.send('Hello World!')
})

// 使用routes
app.use("/api/users", user)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})