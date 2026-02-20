const app = require("./src/app")

const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect("mongodb+srv://rishabh007:rix%402007@cluster0.ixkor3p.mongodb.net/day-06?appName=Cluster0")
    .then(()=>{
        console.log("connected to database");
        
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log("Server is running at port 3000");
    
})