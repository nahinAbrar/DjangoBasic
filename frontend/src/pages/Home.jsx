import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css"
import Note from '../components/Note'

function Home() {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data); console.log(data) })
            .catch((err) => alert(err))
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Note was deleted")
            else alert("Failed to delete note")
            getNotes()
        }).catch((error) => alert(error))


    }

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) => 
            <Note note={note} onDelete={deleteNote} key={note.id} />)}

        </div>

        <h2>Create A Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title</label>

            <br />

            <input
                type="text"
                id="title"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />


            <label htmlFor="content">Content</label>
            <br />

            <textarea
                type="text"
                id="content"
                name="content"
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}
            />

            <br />
            <input type="submit" value="Submit" />
        </form>
    </div>
}

export default Home