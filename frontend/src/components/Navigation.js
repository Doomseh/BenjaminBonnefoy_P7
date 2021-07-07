import {NavLink} from 'react-router-dom';
import logoNav from "../assets/left-groupomania.png";

function Navigation() {
    return (
        <header className="nav">
            <NavLink to="/" className="nav-Link">
                <img src={logoNav} alt="Logo de l'Entreprise Groupomania"></img>
            </NavLink> 
            <ul className="nav-ul">
                <NavLink to="/Inscription" className="nav-Link" activeClassName="nav-Link-Active">
                    <li className="nav-List">Inscription</li>
                </NavLink>
                <NavLink to="/Connexion" className="nav-Link" activeClassName="nav-Link-Active">
                    <li className="nav-List">Connexion</li>
                </NavLink>
            </ul>
        </header>
    )
}

export default Navigation;