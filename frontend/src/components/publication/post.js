import test from "../../assets/test.png";
import useSWR from "swr";

function Post({ id, title, message, userId, postUrl , createdAt, button}) {

    const { data, error } =  useSWR("http://localhost:3000/api/users/" + userId);
    const created = createdAt.slice(0,10);
    
    if (error) return <div className="error">failed to load</div>
    if (!data) return <div className="error">Aucune publication trouvée...</div>
    return (

        <div className="post-link">
            <div className="post">
                <h2 className="post-title">{title}</h2>
                <img src={test} alt="" className="post-img">{postUrl}</img>
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
