import "./Log.css";
import logoWhite from "../assets/groupomania-w.png";
import Log from "./Log";
import {useLocation} from "react-router-dom";

function Signup() {

    const location = useLocation().pathname;
    const btnName = location.substring(1);

    return (
        <div className="component">
            <h1 className="title">Inscrivez vous !</h1>
            <Log btnName={btnName}/>
            <img src={logoWhite} alt="Logo de l'Entreprise Groupomania"></img>
        </div>
    ) 
}

export default Signup;