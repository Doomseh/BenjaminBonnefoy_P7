import { useState } from 'react';
const token = localStorage.getItem("token");
const fnc = require('../../components/function');

function NewPost() {

    const newPost = fnc.newPost;
    const [errorMessage, setErrorMessage] = useState('')

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