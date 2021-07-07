import {NavLink} from 'react-router-dom';
import logoNav from "../assets/left-groupomania.png";

function Navigation() {
    return (
        <header className="navBar">
            <NavLink to="/" className="navLink">
                <img src={logoNav} alt="Logo de l'Entreprise Groupomania"></img>
            </NavLink> 
            <ul className="navUl">
                <NavLink to="/Inscription" className="navLink" activeClassName="navLinkActive">
                    <li className="navList">Inscription</li>
                </NavLink>
                <NavLink to="/Connexion" className="navLink" activeClassName="navLinkActive">
                    <li className="navList">Connexion</li>
                </NavLink>
            </ul>
        </header>
    )
}

export default Navigation;