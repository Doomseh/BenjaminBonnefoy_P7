// Import de useState/useLocation de react et du logo de groupomania
import logoWhite from "../../assets/groupomania-w.png";
import { useState } from "react";
import {useLocation} from "react-router-dom";
// Récupération du fichier de fonction
const fnc = require('../../components/function');

// Création du composant Login
function Login() {

    // Déclaration de useState pour la gestion des messages d'erreur
    const [errorMessage, setErrorMessage] = useState('')
    // Utilisation de useLocation pour nommé le button
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
                {errorMessage ? <p className="submit-error">{errorMessage}</p> : null }
                <button className="btnLog" onClick={(e) => { e.preventDefault(); logUser(setErrorMessage)}}>{btnName}</button>
            </form>
            <img src={logoWhite} alt="Logo de l'Entreprise Groupomania" className="logImg"></img>
        </div>
    )
}

export default Login;