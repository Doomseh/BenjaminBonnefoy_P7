import useSWR from "swr";
const token = localStorage.getItem("token");
const user_Id = parseInt(localStorage.getItem("userId"));
const url = new URL(window.location);
const urlId = url.searchParams.get("id");
const fnc = require('../../components/function');

function UpdatePost() {

    const updatePost = fnc.updatePost;

    const { data, error } = useSWR("http://localhost:3000/api/posts/" + urlId);
    console.log(data)
    if (error) return <div className="error">Failed to load</div>
    if (!data) return <div className="error">Aucune publication trouvée...</div>
    if (!token) return <div className="error">Vous n'êtes pas connecté !</div>
    return (
        <div className="newpost">
            <h1 className="title">Modifier votre publication</h1>
            <form className="newpost-form" id="updatePostForm">
                <div className="form-block">
                    <label htmlFor="title">Titre :</label>
                    <input type="text" id="title" className="form-input" defaultValue={data.title}/>
                </div>
                <div className="form-block">
                    <label htmlFor="message">Message :</label>
                    <textarea id="message" className="form-input newpost-area" defaultValue={data.message}/>
                </div>
                <div className="form-block">
                    <input type="file" accept="image/*" id="fileUrl"/>
                </div>
                {user_Id === data.userId 
                ? <button className="newpost-btn" onClick={updatePost}>Modifier</button>
                : <span className="error">Vous ne pouvez pas modifier cette publication</span>}      
            </form>
            <button className="post-delete newpost-cancel" onClick={() => window.location.href = "http://localhost:4800/home"}>Annuler</button>
        </div>
    )
}


export default UpdatePost;