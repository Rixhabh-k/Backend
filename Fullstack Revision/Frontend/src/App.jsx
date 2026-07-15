import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import axiox from "axios"
import axios from 'axios'






const App = () => {


  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  function fetchNotes(){
    axios.get("http://localhost:3000/get-note").then((res)=>{
      setNotes(res.data.note)
    })
  }

  useEffect(()=>{
    fetchNotes()
  },[])

  

  function formHandler(e) {
    e.preventDefault();
    const {title,description} = e.target.elements
    console.log(title.value,description.value)

    axiox.post("http://localhost:3000/create-note",{
      title: title.value,
      description: description.value
    }).then((res)=>{
      console.log(res.data)
    })

    fetchNotes()


    setTitle('')
    setDescription('')
  }

  function deleteHandler(noteId) {
    axios.delete("http://localhost:3000/delete-note/"+noteId).then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  return (
    <div id="main">
      <div className='noteform' >
      <form onSubmit={(e)=>{
            formHandler(e)
           }}
           >
        <div className="form-group">
          <h1>Note Title</h1>
          <input 
          name='title'
          value={title}
          onChange={(e)=>{
            setTitle(e.target.value)
          }}
           type="text" placeholder='Enter note title' />
        </div>
        <div className="form-group">
          <h1>Note Description</h1>
          <input 
          name='description'
          value={description}
          onChange={(e)=>{
            setDescription(e.target.value)
          }}
          type="text" placeholder='Enter note description' />
        </div>
        <div className="form-group">
          <button>Save</button>
        </div>
      </form>
   </div>
      <div className="noteList">
      
      {
        notes.map((data,idx)=>{
          return(
            <div key={idx} className="note">
        <h1>{data.title} </h1>
        <p>{data.description} </p>
        <button 
          onClick={()=>{
            deleteHandler(data._id)
          }}
        >Delete</button>
      </div>
          )
        })
      }
    </div>
    </div>
  )
}

export default App
