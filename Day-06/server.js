const app = require("./src/app")

const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to database");
        
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log("Server is running at port 3000");
    
})
