import Post from "./Post";
import useSWR from "swr";
const token = localStorage.getItem("token");

function Home() {
    const { data, error } = useSWR("http://localhost:3000/api/posts/");
    console.log(data)
    
    const renderPosts = (posts) => {
        return posts.map(({ id, title, message, userId, createdAt }) => <Post key={id} id={id} title={title} message={message} userId={userId} createdAt={createdAt}/>
    )}
        
        

    if (error) return <div className="component title">failed to load</div>
    if (!data) return <div className="component title">Aucune publication trouvée...</div>
    if (!token) return <div className="error">Vous n'êtes pas connecté !</div>
        return (
            <div className="component">
                <h1 className="title">Publications</h1>      
                {renderPosts(data.data)}
            </div>
        )
}

export default Home;