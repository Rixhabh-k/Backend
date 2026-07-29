const express = require("express")
const cookieParser = require("cookie-parser")

/** 
    *
    *@description: here we are importing routes
    *
*/
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const followRouter = require("./routes/follow.routes")

const app = express()

//middlewares
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/api/auth",authRouter)
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/users",followRouter)

module.exports = app