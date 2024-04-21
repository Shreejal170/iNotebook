import React, { useContext, useState } from "react";
import NoteContext from "../context/Notes/NoteContext";

const AddNote = (props) => {
  //Importing context api and func from NoteContext
  const context = useContext(NoteContext);
  const { addNote } = context;
  //UseContext for notes
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handelClick = (e) => {
    e.preventDefault();
    addNote(note);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            minLength={3}
            required
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={note.description}
            minLength={3}
            required
            className="form-control"
            id="description"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            name="tag"
            value={note.tag}
            className="form-control"
            id="tag"
            onChange={onChange}
          />
        </div>
        <button type="submit" onClick={handelClick} className="btn btn-primary">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
