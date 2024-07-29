import { Container } from "react-bootstrap";
import NotePageLogInView from '../components/NotePageLogInView';
import NotePageLogOutView from '../components/NotePageLogOutView';
import { User } from "../models/user";
import styles from "../styles/NotePage.module.css";

interface NotesPageProps {
    loggedInUser: User | null,
}
const NotesPage = ({ loggedInUser }: NotesPageProps) => {

    return (
        <Container className={styles.notesPage}>
            <>
                {loggedInUser
                    ? <NotePageLogInView />
                    : <NotePageLogOutView />
                }
            </>
        </Container>
    );
}

export default NotesPage;