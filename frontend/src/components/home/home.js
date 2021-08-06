// Import des composant Post et de useSWR
import Post from "../publication/Post";
import useSWR from "swr";
// Récupération du token
const token = localStorage.getItem("token");

// Création du composant Home
function Home() {

    // Appel de useSWR pour récupérer les informations de la base de donnée
    const { data, error } = useSWR("http://localhost:3000/api/posts/");
    // Fonction pour retourner tout les posts présent dans la base de donnée
    const renderPosts = (posts) => {
        if (posts.length === 0) return <div className="error">Aucune publication trouvée...</div>
        return posts.map(({ id, title, message, userId, postUrl ,createdAt }) => <Post key={id} id={id} title={title} message={message} userId={userId} postUrl={postUrl} createdAt={createdAt} button={true}/>
    )}
    
    // Gestion des différentes conditions pour afficher le résultat
    if (error) return <div className="error">Failed to load</div>
    if (!data) return <div className="error">Aucune publication trouvée...</div>
    if (!token) return <div className="error">Vous n'êtes pas connecté !</div>
        return (
            <div className="component">
                <h1 className="title">Fil d'actualité</h1>      
                {renderPosts(data.data)}
            </div>
        )
}

export default Home;