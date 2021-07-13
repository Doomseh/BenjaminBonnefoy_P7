import useSWR from "swr";
const fnc = require('../components/Function');

function Commentaire({postId}) {
    const { data, error } = useSWR("http://localhost:3000/api/comments/post/" + postId);
    

    const newComment = fnc.newComment;  

    const renderComments = (comments) => {
        return comments.map(({ id,  message, createdAt, userName }) =>  <div className="comment-user" key={id}>
                                                                            <p className="comment-name">{userName}</p>
                                                                            <p className="comment-text">{message}</p>
                                                                        </div>
    )}

    if (error) return <div className="error">Failed to load</div>
    if (!data) return <div className="error">Commentaire trouvé...</div>
    return (
            <div className="comment">
                <form className="comment-form">
                    <input type="text"  id="comment" className="form-input" placeholder="Écrivez un commentaire..."></input>
                    <button className="comment-btn" onClick={newComment}>Envoyer</button>
                </form>
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