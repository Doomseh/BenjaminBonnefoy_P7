import Post from "./Post";
import Commentaire from "../comment/Comment";
import useSWR from "swr";
const fnc = require('../../components/function');
const token = localStorage.getItem("token");
const isAdmin = localStorage.getItem("isAdmin");
const user_Id = parseInt(localStorage.getItem("userId"));
const url = new URL(window.location);
const urlId = url.searchParams.get("id");
console.log(isAdmin)

function Publication() {

    const { data, error } = useSWR("http://localhost:3000/api/posts/" + urlId);
    const deletePost = fnc.deletePost;
    
    if (error) return <div className="error">Failed to load</div>
    if (!data) return <div className="error">Aucune publication trouvée...</div>
    if (!token) return <div className="error">Vous n'êtes pas connecté !</div>
    return (
        <div className="component">
            <h1 className="title">Publication</h1>
            <Post id={data.id} title={data.title} message={data.message} userId={data.userId} postUrl={data.postUrl} createdAt={data.createdAt} button={false}/>
            {user_Id === data.userId || isAdmin === "true"
            ?   <div className="post-block">
                    <button className="post-update" onClick={() => window.location.href = "http://localhost:4800/updatepost?id=" + urlId}>Modifier</button> 
                    <button className="post-delete" onClick={deletePost}>Supprimer</button>
                </div> 
            : null}
            <Commentaire postId={data.id} />
        </div>
    )
}

export default Publication;