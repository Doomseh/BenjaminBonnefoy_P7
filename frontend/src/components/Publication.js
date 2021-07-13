import Post from "./Post";
import useSWR from "swr";
const token = localStorage.getItem("token");
const url = new URL(window.location);
const urlId = url.searchParams.get("id");

function Publication() {

    const { data, error } = useSWR("http://localhost:3000/api/posts/" + urlId);
    console.log(data)
    if (error) return <div className="error">Failed to load</div>
    if (!data) return <div className="error">Aucune publication trouvée...</div>
    if (!token) return <div className="error">Vous n'êtes pas connecté !</div>
    return (
        <div className="component">
            <h1 className="title">Publication</h1>
            {data&& <Post key={data.id} id={data.id} title={data.title} message={data.message} userId={data.userId} postUrl={data.postUrl} createdAt={data.createdAt} />}
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