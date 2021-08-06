// Import de useSWR et useState
import useSWR from "swr";
import { useState } from "react";
// Récupération du token/userId et du fichier fonction
const token = localStorage.getItem("token");
const user_Id = localStorage.getItem("userId");
const fnc = require('../../components/function');

// Création du composant Profile
function Profile() {

    // Appel de useSWR pour récupérer les informations de la base de donnée
    const { data, error } = useSWR('http://localhost:3000/api/users/' + user_Id)
    
    // Déclaration de useState pour la gestion des messages d'erreur
    const [errorMessage, setErrorMessage] = useState('');
    const modifyUser = fnc.modifyUser;
    const deleteAccount = fnc.deleteAccount; 
    console.log(data)
    
    // Gestion des différentes conditions pour afficher le résultat
    if (!token) return <div className="error">Vous n'êtes pas connecté !</div>
    if (error) return <div className="error">Failed to load</div>
    if (!data) return <div className="error">Utilisateur non trouvé...</div>
    const account = data.isAdmin === true ? "Admin" : "Utilisateur";
    const created = data.createdAt.slice(0,10);
    return (
        
        <div className="component">
            <h1 className="title">Votre profil</h1>
            <form className="profil" id="profilForm">
                <div className="form-block">
                    <label htmlFor="email">Email :</label>
                    <input type="text" disabled="disabled" className="form-input" defaultValue={data.email}/>
                </div>
                <div className="form-block">
                    <label htmlFor="firstname">Prénom :</label>
                    <input type="text" id="firstname" className="form-input" defaultValue={data.firstname}/>
                </div>
                <div className="form-block">
                    <label htmlFor="lastname">Nom :</label>
                    <input type="text" id="lastname"className="form-input" defaultValue={data.lastname}/>
                </div>
                <div className="profil-block">
                    <div className="profil-button">
                        <img src={data.imageUrl} alt="" className="profil-img"></img>
                        <input type="file" id="file" className="input-file"></input>
                    </div>
                    <div className="form-block">
                        <label htmlFor="account">Type de compte :</label>
                        <input type="text" id="account" disabled="disabled" className="form-input" defaultValue={account}/>
                        <label htmlFor="created">Créer le :</label>
                        <input type="text" id="created" disabled="disabled" className="form-input" defaultValue={created}/>
                    </div>
                </div>
                {errorMessage ? <p className="submit-error">{errorMessage}</p> : null }
                <div className="profil-block borderTop">
                    <button className="btnUpdate" onClick={(e) => {e.preventDefault(); modifyUser(setErrorMessage)}}>Modifier le profil</button>
                    <button className="btnDelete" onClick={deleteAccount}>Supprimer votre profil</button>
                </div>
            </form>
        </div>
    )
}


export default Profile;


