import logoWhite from "../../assets/groupomania-w.png";
import {useLocation} from "react-router-dom";
const fnc = require('../../components/function');

function Login() {

    const location = useLocation().pathname;
    const btnName = location.substring(1);
    const logUser = fnc.logUser;

    return (
        <div className="component">
            <h1 className="title">Connectez vous !</h1>
            <form className="form" id="signupForm">
                <div className="form-block">
                    <label htmlFor="email">Email :</label>
                    <input type="email" id="email" className="form-input"/>
                </div>
                <div className="form-block">
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" className="form-input"/>
                </div>
                <button className="btnLog" onClick={logUser}>{btnName}</button>
            </form>
            <img src={logoWhite} alt="Logo de l'Entreprise Groupomania" className="logImg"></img>
        </div>
    )
}

export default Login;