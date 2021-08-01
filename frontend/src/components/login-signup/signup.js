import logoWhite from "../../assets/groupomania-w.png";
import {useLocation} from "react-router-dom";
const fnc = require('../../components/function');


function Signup() {

    const location = useLocation().pathname;
    const btnName = location.substring(1);
    const postUser = fnc.postUser    

    return (
        <div className="component">
            <h1 className="title">Inscrivez vous !</h1>
            <form className="form" id="signupForm">
                <div className="form-block">
                    <label htmlFor="email">Email :</label>
                    <input type="email" id="email" className="form-input"/>
                </div>
                <div className="form-block">
                    <label htmlFor="lastname">Nom :</label>
                    <input type="text" id="lastname" className="form-input"/>
                </div>
                <div className="form-block">
                    <label htmlFor="firstname">Prénom :</label>
                    <input type="text" id="firstname" className="form-input"/>
                </div>
                <div className="form-block">
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" className="form-input"/>
                </div>
                <button className="btnLog" id="btnSignup" onClick={postUser}>{btnName}</button>
            </form>
            <img src={logoWhite} alt="Logo de l'Entreprise Groupomania" className="logImg"></img>
        </div>
    )

    
}

export default Signup;