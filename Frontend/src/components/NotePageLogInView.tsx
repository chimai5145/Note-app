import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import AddEditedNoteDialog from "../components/AddEditedNoteDialog";
import { Note as NoteModel } from '../models/note';
import * as NotesApi from "../network/notes_api";
import buttonStyle from "../styles/AddNoteDialog.module.css";
import styleUtils from '../styles/utils.module.css';
import Note from "./Note";
import styles from "../styles/NotePage.module.css";


const NotePageLogInView = () => {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [notesLoading, setNotesLoading] = useState(true);
    const [showNotesLoadingError, setShowNoteLoadingError] = useState(false);
    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);


    useEffect(() => {
        async function loadNotes() {
            try {
                setShowNoteLoadingError(false);
                setNotesLoading(true);
                const notes = await NotesApi.fetchNotes();
                setNotes(notes);
            } catch (error) {
                console.error(error);
                setShowNoteLoadingError(true);
            } finally {
                setNotesLoading(false)
            }
        }
        loadNotes();
    }, [])

    async function deleteNote(note: NoteModel) {
        try {
            await NotesApi.deleteNote(note._id);
            setNotes(notes.filter(existingNote => existingNote._id !== note._id));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const noteGrid =
        <Row xs={1} md={2} xl={3} className="g-4">

            {notes.map(note => (
                <Col  className="d-flex justify-content-center align-items-center" key={note._id}>
                    <Note
                        note={note}
                        className={styles.note}
                        onDeleteNoteClicked={deleteNote}
                        onNoteClicked={setNoteToEdit}
                    />
                </Col>
            ))}
        </Row>

    return (
        <>
            <Button
                onClick={() => setShowAddNoteDialog(true)}
                className={`${buttonStyle.button} ${styleUtils.blockCenter}`}>
                Add New Note
            </Button>
            {notesLoading && <Spinner animation='border' />}
            {showNotesLoadingError && <p>Something went wrong. Please Refresh</p>}
            {!notesLoading && !showNotesLoadingError &&
                <>
                    {notes.length > 0
                        ? noteGrid
                        : <p style={{
                            color: '#E7E5DF',
                            fontFamily: 'Impact, fantasy',
                            padding: "10px 20px",
                            fontWeight: "700"
                        }} >
                            You have no notes
                        </p>}
                </>}
            {showAddNoteDialog &&
                <AddEditedNoteDialog
                    onDimiss={() => setShowAddNoteDialog(false)}
                    onNoteSaved={(newNotes) => {
                        setNotes([...notes, newNotes]);
                        setShowAddNoteDialog(false);
                    }}
                />
            }
            {noteToEdit &&
                <AddEditedNoteDialog
                    noteToEdit={noteToEdit}
                    onDimiss={() => setNoteToEdit(null)}
                    onNoteSaved={(updatedNote) => {
                        setNotes(notes.map(existingNote => updatedNote === existingNote ? updatedNote : existingNote))
                        setNoteToEdit(null)
                    }}
                />
            }</>
    );
}

export default NotePageLogInView;