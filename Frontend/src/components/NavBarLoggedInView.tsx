import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";
import style from "../styles/NavBar.module.css";

interface NavBarLoggedInViewProps{
    user: User,
    onLogOutSuccessful: () => void,
}

const NavBarLoggedInView = ({user, onLogOutSuccessful} : NavBarLoggedInViewProps) => {

    async function logOut() {
        try {
            await NotesApi.logout();
            onLogOutSuccessful()
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }
    return (  
        <>
        <Navbar.Text className={style.wrapper}>
            Signed in as: <span className={style.bold}> {user.username}</span>
        </Navbar.Text>
        <Button onClick={logOut} className={style.navBarToggle}>Log out</Button>
        </>

    );
}
 
export default NavBarLoggedInView;