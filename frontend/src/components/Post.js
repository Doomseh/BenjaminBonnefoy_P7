import "./Post.css";
import test from "../assets/test.png";
import { useHistory } from "react-router-dom";

function Post({ id, userId, title, message, createdAt }) {

    let history = useHistory();

    return (
        <div className="post">
            <h2 className="post-title">{title}</h2>
            <img src={test} alt="" className="post-img"></img>
            <p className="post-message">{message}</p>
            <div className="post-user">
                <p className="post-name">{userId}</p>
                <p className="post-time">Publié le : {createdAt}</p>
            </div>
            <button className="btnComment" onClick={() => history.push("/post?id=" + id)}>Commentez</button>
        </div>
    )
}

export default Post;