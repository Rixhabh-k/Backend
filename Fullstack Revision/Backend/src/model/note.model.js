const mongoose = require("mongoose")
const noteModel = require("../../../../Backup-Revison/src/model/notes.model")

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
})

const nodeModel = mongoose.model("notes",noteSchema)

module.exports = nodeModel