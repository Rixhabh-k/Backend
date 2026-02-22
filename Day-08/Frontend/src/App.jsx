import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.note);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function formHandler(e) {
    e.preventDefault();

    const {title, description} = e.target.elements

    console.log(title.value,description.value);

    axios.post("http://localhost:3000/api/notes",{
      title: title.value,
      description: description.value
    }).then(res=>{
      console.log(res.data);
      fetchNotes()
    })

    setTitle('')
    setDescription('')
    
  }

  function deleteHandler(noteId){
    axios.delete("http://localhost:3000/api/notes/"+noteId).then((res)=>{
      console.log(res.data);
      fetchNotes()
    })
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          formHandler(e);
        }}
      >
        <input type="text" placeholder="Title" name="title" value={title} 
        onChange={(e)=>{
          setTitle(e.target.value)
        }} />
        <input type="text" placeholder="Description" name="description" value={description} onChange={(e)=>{
          setDescription(e.target.value)
        }} />
        <button>Submit</button>
      </form>

      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>{
                deleteHandler(note._id)
              }}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
