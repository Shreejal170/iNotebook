import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/api/";
  const noteInitial = [];
  const [notes, setNote] = useState(noteInitial);

  const getNotes = async () => {
    const response = await fetch(`${host}notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNote(json.note);
  };
  // const s1 = {
  //   name: "Shreejal",
  //   class: "102",
  // };
  // const [state, setState] = useState(s1);
  // const update = () => {
  //   setTimeout(() => {
  //     setState({
  //       name: "Srizal",
  //       class: "0",
  //     });
  //   }, 1000);
  // };
  //Add a note
  const addNote = async (noteinfo) => {
    const { title, description, tag } = noteinfo;
    //Calling API
    const response = await fetch(`${host}notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNote(notes.concat(note));
  };
  //Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      // body: JSON.stringify(data),
    });
    const json = response.json();
    //Client Side
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNote(newNote);
  };

  //Edit note
  const editNote = async (noteinfo) => {
    const { etitle, edescription, etag } = noteinfo;
    //Api Call
    const response = await fetch(`${host}notes/updatenote/${noteinfo._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: etitle,
        description: edescription,
        tag: etag,
      }),
    });

    //Client side edit
    const newNote = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNote.length; i++) {
      const element = newNote[i];
      if (element._id == noteinfo._id) {
        newNote[i].title = etitle;
        newNote[i].description = edescription;
        newNote[i].tag = etag;
        break;
      }
    }
    setNote(newNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
