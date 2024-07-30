import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import style from "../styles/NavBar.module.css";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLogOutView from "./NavBarLoggOutView";
import { Link } from "react-router-dom";

interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLogInClicked: () => void,
    onLogOutSuccessful: () => void,
}

const NavBar = ({ loggedInUser, onSignUpClicked, onLogInClicked, onLogOutSuccessful }: NavBarProps) => {
    return (
        <Navbar className={style.navBar} expand="md" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Cool Note App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className={style.wrapper}>
                        <Nav.Link className={style.text} as={Link} to="/privacy">
                            Privacy
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedInUser
                            ? <NavBarLoggedInView
                                user={loggedInUser}
                                onLogOutSuccessful={onLogOutSuccessful} />
                            : <NavBarLogOutView
                                onSignUpClicked={onSignUpClicked}
                                onLogInClicked={onLogInClicked} />}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;