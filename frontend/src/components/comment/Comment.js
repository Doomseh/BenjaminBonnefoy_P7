// Import de useSWR et useState
import useSWR from "swr";
import { useState } from "react";
// Récupération du userId/isAdmin et du fichier fonction
const user_Id = parseInt(localStorage.getItem("userId"));
const isAdmin = localStorage.getItem("isAdmin");
const fnc = require('../../components/function');

// Création du composant Commentaire
function Commentaire({postId}) {

     // Appel de useSWR pour récupérer les informations de la base de donnée
    const { data, error } = useSWR("http://localhost:3000/api/comments/post/" + postId);  

    const newComment = fnc.newComment;
    const deleteComment = fnc.deleteComment; 
    const updateComment = fnc.updateComment;

    // Déclaration de useState pour la gestion des messages d'erreur
    const [errorMessage, setErrorMessage] = useState('');
    const [errorUpdateMessage, setErrorUpdateMessage] = useState(''); 

    // Fonction pour retourner tout les commentaires de la publication présents dans la base de donnée
    const renderComments = (comments) => {
        return comments.map(({ id,  message, createdAt, userName, userId }) =>  
        <div className="comment-user" key={id}>
            <div className="comment-info">
                <p className="comment-name">{userName}</p>
                <p className="comment-date">Le : {createdAt.slice(0,10)}</p>
            </div>
            {user_Id === userId || isAdmin === "true"
            ?   <form className="update-form">
                    <input type="text" className="update-text" id="updateComment" defaultValue={message}/>
                    {errorUpdateMessage ? <p className="submit-error">{errorUpdateMessage}</p> : null }
                    <div className="comment-button">
                        <button className="comment-update" onClick={(e) => {e.preventDefault(); updateComment(id, setErrorUpdateMessage)}}>Modifier</button>
                        <button className="comment-delete" onClick={(e) => {e.preventDefault(); deleteComment(id)}}>Supprimer</button>
                    </div>
                </form> 
            : <p className="comment-text">{message}</p> }
        </div>
    )}

    // Gestion des différentes conditions pour afficher le résultat
    if (error) return <div className="error">Failed to load</div>
    if (!data) return <div className="error">Commentaire trouvé...</div>
    return (
            <div className="comment">
                <form className="comment-form">
                    <input type="text"  id="comment" className="form-input" placeholder="Écrivez un commentaire..."></input>
                    <button className="comment-btn" onClick={(e) => {e.preventDefault(); newComment(setErrorMessage)}}>Envoyer</button>
                </form>
                {errorMessage ? <p className="submit-error">{errorMessage}</p> : null }
                <div className ="comment-block">
                    <h2 className="comment-title">Commentaires</h2>
                    {data.data.length ===  0  
                    ? <div className="error">Il n'y a aucun commentaire</div> 
                    : renderComments(data.data)}
                </div>   
            </div>
    )
}

export default Commentaire;