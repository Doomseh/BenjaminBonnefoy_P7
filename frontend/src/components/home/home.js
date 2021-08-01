import Post from "../publication/post";
import useSWR from "swr";
const token = localStorage.getItem("token");

function Home() {
    const { data, error } = useSWR("http://localhost:3000/api/posts/");
    const renderPosts = (posts) => {
        return posts.map(({ id, title, message, userId, postUrl ,createdAt }) => <Post key={id} id={id} title={title} message={message} userId={userId} postUrl={postUrl} createdAt={createdAt} button={true}/>
    )}

    if (error) return <div className="error">Failed to load</div>
    if (!data) return <div className="error">Aucune publication trouvée...</div>
    if (!token) return <div className="error">Vous n'êtes pas connecté !</div>
        return (
            <div className="component">
                <h1 className="title">Publications</h1>      
                {renderPosts(data.data)}
            </div>
        )
}

export default Home;