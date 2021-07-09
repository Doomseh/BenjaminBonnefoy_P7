import {NavLink} from 'react-router-dom';
import logoNav from "../assets/left-groupomania.png";
const fnc = require('../components/Function')
const token = localStorage.getItem("token");
const isLogged = token != null ? true : false
console.log(isLogged)

function Navigation() {

    const logOut = fnc.logOut;

    return (
        <header className="nav">
            {isLogged 
            ?   <NavLink to="/home" className="nav-link">
                    <img src={logoNav} alt="Logo de l'Entreprise Groupomania"></img>
                </NavLink> 

            :   <NavLink to="/" className="nav-link">
                    <img src={logoNav} alt="Logo de l'Entreprise Groupomania"></img>
                </NavLink> 
            }
            {isLogged 
            ?   <ul className="nav-ul">
                    <NavLink to="/newpost" className="nav-link" activeClassName="nav-link-active">
                        <li className="nav-list">Ajouter une publication</li>
                    </NavLink>
                    <NavLink to="/Inscription" className="nav-link" activeClassName="nav-link-active">
                        <li className="nav-list">Profil</li>
                    </NavLink>
                    <NavLink to="/home" className="nav-link" onClick={logOut}>
                        <li className="nav-list">Déconnexion</li>
                    </NavLink>
                </ul> 

            :   <ul className="nav-ul">
                    <NavLink to="/Inscription" className="nav-link" activeClassName="nav-link-active">
                        <li className="nav-list">Inscription</li>
                    </NavLink>
                    <NavLink to="/Connexion" className="nav-link" activeClassName="nav-link-active">
                        <li className="nav-list">Connexion</li>
                    </NavLink>
                </ul> 
            }
        </header>
    )
}

export default Navigation;