import { Card } from "react-bootstrap";
import styleUtils from '../styles/utils.module.css';
import { MdDelete } from "react-icons/md";
import { Note as NoteModel } from "../models/note";
import style from "../styles/Note.module.css";
import { formatDate } from "../utils/formatDate";
import { useEffect, useRef, useState } from "react";

interface NoteProps {
    note: NoteModel;
    onNoteClicked: (note: NoteModel) => void,
    onDeleteNoteClicked: (note: NoteModel) => void,
    className?: string;
}

const Note = ({ note, className, onDeleteNoteClicked, onNoteClicked }: NoteProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt
    } = note;

    // const textRef = useRef<any>(null);
    // const [isOverflowing, setIsOverFlowing] = useState(false);

    // useEffect(() => {
    //     const element = textRef.current;
    //     if (element && element.scrollHeight > element.clientHeight) {
    //         setIsOverFlowing(true);
    //     } else {
    //         setIsOverFlowing(false);
    //     }
    // }, [text])

    let createdUpdatedText: string;
    if (createdAt < updatedAt) {
        createdUpdatedText = "Updated at: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created at: " + formatDate(createdAt);
    }
    return (
        <Card
            className={`${style.noteCard} ${className}`}
            onClick={() => onNoteClicked(note)}
        >
            <Card.Body>
                <Card.Title className={`${styleUtils.flexCenter} ${style.cardTitle}`}>
                    {title}
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(e) => {
                            onDeleteNoteClicked(note);
                            e.stopPropagation();
                        }}
                        style={{ fontSize: '120%' }}
                    />
                </Card.Title>
                {/* <Card.Text className={`${style.cardText} ${isOverflowing ? style.overflowGradient : ''}`}> */}
                <Card.Text className={style.cardText}>
                    {text}
                </Card.Text>

            </Card.Body>
            <Card.Footer className={`text-muted ${style.cardFooter}`}>
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}

export default Note;