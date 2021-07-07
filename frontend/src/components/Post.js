import test from "../assets/test.png";
import {Link} from 'react-router-dom';

function Post({ id, userId, title, message, createdAt }) {
    let linkId = "post?id=" + id

    return (
        <Link to={linkId} className="post-link">
            <div className="post">
                <h2 className="post-title">{title}</h2>
                <img src={test} alt="" className="post-img"></img>
                <p className="post-message">{message}</p>
                <div className="post-user">
                    <p className="post-time">Publié le : {createdAt}</p>
                    <p className="post-name">Par : {userId}</p>
                </div>
            </div>
        </Link>
    )
}

export default Post;
