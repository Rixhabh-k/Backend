const express = require("express")
const noteModel = require("./model/note.model")
const cors = require('cors')

const app = express()

//middleware
app.use(express.json());
app.use(cors())

//create note api
app.post("/create-note",async (req,res)=>{
    const {title,description} = req.body

    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message: "note created"
    })
})

//fetch note api
app.get("/get-note",async(req,res)=>{
    const note = await noteModel.find()

    res.status(200).json({
        message:"notes fetched",
        note
    })
})

//delete api
app.delete("/delete-note/:id",async(req,res)=>{
    const id = req.params.id

    const note = await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "note deleted"
    })
})

module.exports = app