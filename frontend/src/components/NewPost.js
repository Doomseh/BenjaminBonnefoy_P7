const token = localStorage.getItem("token");
const fnc = require('../components/Function');

function NewPost() {

    const newPost = fnc.newPost;

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
                <button className="newpost-btn" onClick={newPost}>Envoyer</button>
            </form>
        </div>
    )
}


export default NewPost;