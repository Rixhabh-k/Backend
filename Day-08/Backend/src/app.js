const express = require('express')
const noteModel = require('./models/note.model')

const app = express()

//middleware
app.use(express.json())

// creating notes API 
app.post('/api/notes',async (req,res)=>{

    const {title, description} = req.body

    const note = await noteModel.create({
        title,description
    })

    res.status(200).json({
        message: "Note created successfully",
        note
    })
})

//Fetching notes API
app.get('/api/notes',async (req,res)=>{
    const note = await noteModel.find()

    res.status(201).json({
        message: "Notes fetched successfully",
        note
    })
})

//Deleting notes API
app.delete('/api/notes/:id',async (req,res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully"
    })
})

//Update notes API
app.patch('/api/notes/:id',async (req,res)=>{
    const id = req.params.id
    const {title} = req.body

    await noteModel.findByIdAndUpdate(id,{title})

    res.status(200).json({
        message:"Note updated successfully"
    })
})

module.exports = app