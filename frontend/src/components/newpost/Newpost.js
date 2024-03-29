// Import de useState
import { useState } from 'react';
// Récupération du token et du fichier fonction
const token = localStorage.getItem("token");
const fnc = require('../../components/function');

// Création du composant NewPost
function NewPost() {

    const newPost = fnc.newPost;
    // Déclaration de useState pour la gestion des messages d'erreur
    const [errorMessage, setErrorMessage] = useState('')

    // Condition pour vérifier si l'utilisateur est connecté ou non
    if (!token) return <div className="error">Vous n'êtes pas connecté !</div>
    return (
        <div className="newpost">
            <h1 className="title">Ajouter une publication</h1>
            <form className="newpost-form" id="newpostForm">
                <div className="form-block">
                    <label htmlFor="title">Titre :</label>
                    <input type="text" id="title" className="form-input"/>
                </div>
                <div className="form-block">
                    <label htmlFor="message">Message :</label>
                    <textarea id="message" className="form-input newpost-area"/>
                </div>
                <div className="form-block">
                    <input type="file" accept="image/*" id="fileUrl"/>
                </div>
                {errorMessage ? <p className="submit-error">{errorMessage}</p> : null }
                <button className="newpost-btn" onClick={(e) => { e.preventDefault(); newPost(setErrorMessage) }}>Envoyer</button>     
            </form>
            <button className="post-delete newpost-cancel" onClick={() => window.location.href = "http://localhost:4800/home"}>Annuler</button>
        </div>
    )
}


export default NewPost;