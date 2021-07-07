import test from "../assets/test.png";
import {Link} from 'react-router-dom';

function Post({ id, userId, title, message, createdAt }) {
    let linkId = "post?id=" + id

    return (
        <Link to={linkId} className="post-Link">
        <div className="post">
            <h2 className="post-title">{title}</h2>
            <img src={test} alt="" className="post-img"></img>
            <p className="post-message">{message}</p>
            <div className="post-user">
                <p className="post-name">{userId}</p>
                <p className="post-time">Publié le : {createdAt}</p>
            </div>
        </div>
        </Link>
    )
}

export default Post;
