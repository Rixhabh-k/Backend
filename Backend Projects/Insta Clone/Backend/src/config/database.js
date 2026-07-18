const mongoose =  require("mongoose")

async function connectionToDb() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to DB")
}

module.exports = connectionToDb
