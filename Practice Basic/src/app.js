const express = require('express')

const app = express()

// middleware 
app.use(express.json())

// notes app 
const notes = []

// post api to make notes 
app.post('/notes',(req,res)=>{
    notes.push(req.body)
    res.send("notes created")
})

// get api to fetch notes
app.get('/notes',(req,res)=>{
    console.log(notes)
    res.send(notes)
})

// delete api to delete notes
app.delete('/notes/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)

    delete notes[id]
    res.send("note deleted")
})

// update api to edit notes
app.patch('/notes/:id',(req,res)=>{
    const id = req.params.id

    notes[id].description = req.body.description

    res.send("note updated successfully")
})

module.exports = app
