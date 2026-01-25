const express = require('express')

const app = express()

//middleware
app.use(express.json())

//notes 
const notes = []

app.post('/notes',(req,res)=>{

    notes.push(req.body)
    res.send("note created")

})

app.get('/notes',(req,res)=>{
    res.send(notes)
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]
    res.send('note deleted')
})

app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].tittle = req.body.tittle
    res.send("note updated")
})

module.exports = app