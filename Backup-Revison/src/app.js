const express = require('express')
const noteModel = require('./model/notes.model')

const app = express()

//middleware
app.use(express.json())

//create note api
app.post("/create-note",async (req,res)=>{
    const {title,description} = req.body

    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message: "note created and saved to DB",
        note
    })
})

//get note api 
app.get('/get-note',async(req,res)=>{
    const note = await noteModel.find()

    res.status(200).json({
        message: "notes fetched",
        note
    })
})

// delete api
app.delete("/delete-note/:id",async(req,res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "note deleted"
    })
})

//note update api
app.patch("/update-note/:id",async(req,res)=>{
    const id = req.params.id
    const {title} = req.body

    await noteModel.findByIdAndUpdate(id,{title})

    res.status(200).json({
        message: "note updated"
    })
})


module.exports = app