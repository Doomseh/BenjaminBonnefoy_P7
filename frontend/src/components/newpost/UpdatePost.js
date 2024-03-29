// Import de useSWR et useState
import useSWR from "swr";
import { useState } from "react";
// Récupération du token/user_Id/isAdmin/postId et du fichier fonction
const token = localStorage.getItem("token");
const user_Id = parseInt(localStorage.getItem("userId"));
const isAdmin = localStorage.getItem("isAdmin");
const url = new URL(window.location);
const postId = url.searchParams.get("id");
const fnc = require('../../components/function');

// Création du composant UpdatePost
function UpdatePost() {

    // Appel de useSWR pour récupérer les informations de la base de donnée
    const { data, error } = useSWR("http://localhost:3000/api/posts/" + postId);

    const updatePost = fnc.updatePost;
    // Déclaration de useState pour la gestion des messages d'erreur
    const [errorMessage, setErrorMessage] = useState('')

    // Gestion des différentes conditions pour afficher le résultat
    if (error) return <div className="error">Failed to load</div>
    if (!data) return <div className="error">Aucune publication trouvée...</div>
    if (!token) return <div className="error">Vous n'êtes pas connecté !</div>
    return (
        <div className="newpost">
            <h1 className="title">Modifier votre publication</h1>
            <form className="newpost-form" id="updatePostForm">
                <div className="form-block">
                    <label htmlFor="title">Titre :</label>
                    <input type="text" id="title" className="form-input" defaultValue={data.title}/>
                </div>
                <div className="form-block">
                    <label htmlFor="message">Message :</label>
                    <textarea id="message" className="form-input newpost-area" defaultValue={data.message}/>
                </div>
                <div className="form-block">
                    <input type="file" accept="image/*" id="fileUrl"/>
                </div>
                {errorMessage ? <p className="submit-error">{errorMessage}</p> : null }
                {user_Id === data.userId || isAdmin === "true"
                ? <button className="newpost-btn" onClick={(e) => { e.preventDefault(); updatePost(setErrorMessage) }}>Modifier</button>
                : <span className="error">Vous ne pouvez pas modifier cette publication</span>}      
            </form>
            <button className="post-delete newpost-cancel" onClick={() => window.location.href = "http://localhost:4800/home"}>Annuler</button>
        </div>
    )
}


export default UpdatePost;