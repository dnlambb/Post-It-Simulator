import React, {Fragment, useRef, useState, useEffect} from 'react'
import { v4 as uuid } from 'uuid';
import { Postit } from './Postit';

const KEY = "noteList-notes";

const PostitList = () => {

    const [notes, setNotes] = useState([]);

    const titleRef = useRef();
    const textRef = useRef();
    const importantRef = useRef();

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem(KEY));
        if (storedNotes) {
            setNotes(storedNotes);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(notes))
    }, [notes])

    const addNote = () => {
        const title = titleRef.current.value;
        const text = textRef.current.value;
        const important = importantRef.current.checked;

        if (text !== '') {
            setNotes((prevNotes) => {
                var classStyle = "normalColor";    
                if (important) {
                    classStyle = "importantColor";
                }
                const newNote = {
                    id: uuid(),
                    title: title,
                    text: text,
                    classStyle: classStyle
                }
                return [...prevNotes, newNote]
            })
        }
        titleRef.current.value = null;
        textRef.current.value = null;
        importantRef.current.checked = false;
    }

    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    }

    return(
        <Fragment>
            <section className="container mt-5">
                <h1 className='text-center'>Post It Simulator!</h1>
                
                <form className="row align-items mt-4 mb-4 d-flex sm-flex-column text-center gap-5">
                    <div className="col-12 w-100 col-sm-6">
                        <input ref={titleRef} type="text" className="form-control form-control-lg" placeholder="Título" required />
                    </div>

                    <div className="col-12 w-100 col-sm-6">
                        <input ref={textRef} type="text" className="form-control form-control-lg" placeholder="Texto" required />
                    </div>

                    <div className="col-12">
                        <div className="form-check d-flex justify-content-center gap-2">
                            <input ref={importantRef} className="form-check-input" type="checkbox" id='important-check' />
                            <label className="form-check-label text-light" htmlFor='important-check'>
                                ¡Importante!
                            </label>
                        </div>
                    </div>

                    <div className="col-12">
                        <button onClick={addNote} className="btn btn-success btn-lg">Agregar</button>
                    </div>
                </form>
                <ul>
                    {notes.map((note) => (
                        <Postit note={note} key={note.id} deleteNote={deleteNote}></Postit>
                    ))}
                </ul>
            </section>
        </Fragment>
    );
}

export { PostitList };