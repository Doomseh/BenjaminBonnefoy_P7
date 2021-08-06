// Import de NavLink de react et le logo de groupomania
import {NavLink} from 'react-router-dom';
import logoNav from "../../assets/left-groupomania.png";
// Récupération du token/userId et du fichier fonction
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const fnc = require('../../components/function');
// Constante pour vérifier si l'utilisateur est connecté ou non avec grâce au token
const isLogged = token != null ? true : false

// Création du composant Navigation
function Navigation() {

    const logOut = fnc.logOut;

    return (
        <header className="nav">
            {isLogged 
            ?   <NavLink to="/home" className="nav-link">
                    <img src={logoNav} alt="Logo de l'Entreprise Groupomania" className="test"></img>
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
                    <NavLink to={"/profile?id=" + userId} className="nav-link" activeClassName="nav-link-active">
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