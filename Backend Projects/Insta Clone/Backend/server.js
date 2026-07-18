require("dotenv").config()
const app = require("./src/app")
const connectionToDb = require("./src/config/database")

connectionToDb()

app.listen(3000,()=>{
    console.log("server is running at port 3000")
})