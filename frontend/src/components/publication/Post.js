import useSWR from "swr";

// Création du composant Post avec les props récupérer de la base de donnée
function Post({ id, title, message, userId, postUrl , createdAt, button}) {

    // Appel de useSWR pour récupérer les informations de la base de donnée
    const { data, error } =  useSWR("http://localhost:3000/api/users/" + userId);
    const created = createdAt.slice(0,10);
    
    // Gestion des différentes conditions pour afficher le résultat
    if (error) return <div className="error">failed to load</div>
    if (!data) return <div className="error">Aucune publication trouvée...</div>
    return (

        <div className="post-link">
            <div className="post">
                <h2 className="post-title">{title}</h2>
                <img src={postUrl} alt="" className="post-img"></img>
                <p className="post-message">{message}</p>
                {button 
                ? <button className="post-see" onClick={() => window.location.href = "http://localhost:4800/post?id=" + id}>Voir la publication</button> 
                : null}
                <div className="post-user">
                    <p className="post-time">Publié le : {created}</p>
                    <p className="post-name">Par : {data.firstname} {data.lastname}</p>
                </div>
            </div>
        </div>

        )
    
}

export default Post;