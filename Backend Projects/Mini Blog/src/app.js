const express =  require("express")
const authRouter = require("./routes/auth.routes")
const blogRouter = require("./routes/blog.routes")
const cookieParser = require("cookie-parser")

const app = express()

//middlewares
app.use(express.json())
app.use(cookieParser())

// routes
app.use("/api/auth",authRouter)
app.use("/api/blog",blogRouter)

module.exports = app