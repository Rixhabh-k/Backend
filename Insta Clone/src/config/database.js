const mongsoose = require("mongoose")

function connectToDb(){
    mongsoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('Connected to DB')
    })
}

module.exports = connectToDb