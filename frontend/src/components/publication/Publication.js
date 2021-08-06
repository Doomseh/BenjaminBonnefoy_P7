// Import des composant Post/Comment et de useSWR
import Post from "./Post";
import Commentaire from "../comment/Comment";
import useSWR from "swr";
// Require du fichier des fonctions
const fnc = require('../../components/function');
// Récupération du token/isAdmin/userId du localStorage et postId des params url
const token = localStorage.getItem("token");
const isAdmin = localStorage.getItem("isAdmin");
const user_Id = parseInt(localStorage.getItem("userId"));
const url = new URL(window.location);
const postId = url.searchParams.get("id");

// Création du composant Publication
function Publication() {

    // Appel de useSWR pour récupérer les informations de la base de donnée
    const { data, error } = useSWR("http://localhost:3000/api/posts/" + postId);
    const deletePost = fnc.deletePost;
    
    // Gestion des différentes conditions pour afficher le résultat
    if (error) return <div className="error">Failed to load</div>
    if (!data) return <div className="error">Aucune publication trouvée...</div>
    if (!token) return <div className="error">Vous n'êtes pas connecté !</div>
    return (
        <div className="component">
            <h1 className="title">Publication</h1>
            <Post id={data.id} title={data.title} message={data.message} userId={data.userId} postUrl={data.postUrl} createdAt={data.createdAt} button={false}/>

            {/* Condition pour vérifier s'il s'agit du créateur de la publication ou d'un compte admin pour afficher les button*/}
            {user_Id === data.userId || isAdmin === "true"
            ?   <div className="post-block">
                    <button className="post-update" onClick={() => window.location.href = "http://localhost:4800/updatepost?id=" + postId}>Modifier</button> 
                    <button className="post-delete" onClick={deletePost}>Supprimer</button>
                </div> 
            : null}

            <Commentaire postId={data.id} />
        </div>
    )
}

export default Publication;