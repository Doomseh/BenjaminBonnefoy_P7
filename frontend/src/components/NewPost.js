function NewPost() {
    return (
        <div className="newpost">
            <h1 className="title">Ajouter une publication</h1>
            <form className="newpost-form">
                <div className="form-Block">
                    <label htmlFor="title">Titre :</label>
                    <input type="text" id="title" className="form-Input"/>
                </div>
                <div className="form-Block">
                    <label htmlFor="message">Message :</label>
                    <textarea id="message" className="form-Input newpost-area"/>
                </div>
                <div className="form-Block">
                    <input type="file" accept="image/*" id="fileUrl"/>
                </div>
                <button className="newpost-btn">Envoyer</button>
            </form>
        </div>
    )
}


export default NewPost;