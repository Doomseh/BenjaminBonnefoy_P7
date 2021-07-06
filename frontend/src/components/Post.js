import "./Post.css";
import test from "../assets/test.png";

function Post({ id, userId, title, message, createdAt }) {
    return (
        <div className="post">
            <h2 className="post-title">{title}</h2>
            <img src={test} alt="" className="post-img"></img>
            <p className="post-message">{message}</p>
            <div className="post-user">
                <p className="post-name">{userId}</p>
                <p className="post-time">Publié le : {createdAt}</p>
            </div>
        </div>
    )
}

export default Post;