import Post from "./Post";
const token = localStorage.getItem("token");

function Publication() {
    if (!token) return <div className="error">Vous n'êtes pas connecté !</div>
    return (
        <div className="component">
            <h1 className="title">Publication</h1>
            <Post id="234" userId="Martin" title="Je suis un titre" message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" createdAt="22/12/2321" />
            <div className="comment">
                <form className="comment-form">
                    <input type="text" className="form-input" placeholder="Écrivez un commentaire..."></input>
                    <button className="comment-btn">Envoyer</button>
                </form>
                <div className ="comment-block">
                    <h2 className="comment-title">Commentaires</h2>
                    <div className="comment-user">
                        <p className="comment-name">Kévin</p>
                        <p className="comment-text">Je suis un commentaire...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Publication;