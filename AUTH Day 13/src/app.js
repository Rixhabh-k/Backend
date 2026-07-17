const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")

const authRouter = require("./Routes/auth.route")

//middlewares
app.use(express.json())
app.use(cookieParser())

// api's
app.use("/api/auth",authRouter)
app.use("/api/auth",authRouter)


module.exports = app