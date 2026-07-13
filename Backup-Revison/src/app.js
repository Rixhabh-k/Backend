const express = require("express")

const app = express()

//middleware
app.use(express.json())

const notes = []

// post API
app.post("/notes",(req,res)=>{
    notes.push(req.body)
    res.send("notes created")
})

//get API
app.get("/get-notes",(req,res)=>{
    console.log(notes)
    res.send(notes)
})

//delete API
app.delete("/delete-note/:index",(req,res)=>{
    console.log(req.params);
    delete notes[req.params.index]
    res.send(`note deleted`)
})

//updating note API
app.patch("/update-note/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.send("note updated successfully")
})


module.exports = app