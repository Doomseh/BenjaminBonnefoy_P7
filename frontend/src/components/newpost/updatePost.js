import useSWR from "swr";
const token = localStorage.getItem("token");
const url = new URL(window.location);
const urlId = url.searchParams.get("id");
const fnc = require('../../components/function');

function ModifyPost() {

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
                <button className="newpost-btn" onClick={updatePost}>Modifier</button>        
            </form>
            <button className="post-delete newpost-cancel" onClick={() => window.location.href = "http://localhost:4800/home"}>Annuler</button>
        </div>
    )
}


export default ModifyPost;