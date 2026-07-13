const express = require('express')

const app = express()

//middleware
app.use(express.json())


const notes = []

//create notes api
app.post("/create-note",(req,res)=>{
    notes.push(req.body)
    res.status(201).json({
        message: "note created"
    })
})

//get notes api
app.get("/fetch-note",(req,res)=>{
    res.status(200).json({
        message: "notes fetched successfully",
        notes 
    })
})

//Delete note api
app.delete("/delete-note/:id",(req,res)=>{
    delete notes[req.params.id]
    res.status(200).json({
        message: "Note Deleted"
    })
})

//Update note api
app.patch('/update-note/:id',(req,res)=>{
    notes[req.params.id].description = req.body
    res.status(200).json({
        message: "Note updated successfully",
        notes
    })
})

module.exports = app