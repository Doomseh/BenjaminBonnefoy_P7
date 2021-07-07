import {NavLink} from 'react-router-dom';
import logoNav from "../assets/left-groupomania.png";

function Navigation() {
    return (
        <header className="nav">
            <NavLink to="/" className="nav-link">
                <img src={logoNav} alt="Logo de l'Entreprise Groupomania"></img>
            </NavLink> 
            <ul className="nav-ul">
                <NavLink to="/Inscription" className="nav-link" activeClassName="nav-link-active">
                    <li className="nav-list">Inscription</li>
                </NavLink>
                <NavLink to="/Connexion" className="nav-link" activeClassName="nav-link-active">
                    <li className="nav-list">Connexion</li>
                </NavLink>
            </ul>
        </header>
    )
}

export default Navigation;