import test from "../assets/test.png";
import {Link} from 'react-router-dom';
//import useSWR from "swr";


function Post({id, title}) {
    //const { data, error } = useSWR("http://localhost:3000/api/posts/");
console.log(title)
    //if (error) return <div className="component title">failed to load</div>
    //if (!data) return <div className="component title">Aucune publication trouvée...</div>
    return (

        <Link to="" className="post-link" key={id}>
            <div className="post">
                <h2 className="post-title">{title}</h2>
                <img src={test} alt="" className="post-img"></img>
                <p className="post-message">t</p>
                <div className="post-user">
                    <p className="post-time">Publié le : </p>
                    <p className="post-name">Par : </p>
                </div>
            </div>
        </Link>

        )
    
}

export default Post;
