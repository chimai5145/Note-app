import { Button } from "react-bootstrap";
import style from "../styles/NavBar.module.css";

interface NavBarLogOutViewProps{
    onSignUpClicked:()=> void,
    onLogInClicked:()=> void,
}

const NavBarLogOutView = ({onSignUpClicked, onLogInClicked}: NavBarLogOutViewProps) => {
    return (  
        <>
        <Button onClick={onSignUpClicked} className={style.navBarToggle}>Sign up</Button>
        <Button onClick={onLogInClicked} className={style.navBarToggle}>Log in</Button>
        </>
    );
}
 
export default NavBarLogOutView;