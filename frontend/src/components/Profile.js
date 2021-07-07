import userImg from "../assets/DABEUIH.png";

function Profile() {
    return (
        <div className="component">
            <h1 className="title">Votre profil</h1>
            <form className="profil">
                <div className="form-Block">
                    <label htmlFor="email">Email :</label>
                    <input type="text" disabled="disabled" className="form-Input" value="test@gmail.com"/>
                </div>
                <div className="form-Block">
                    <label htmlFor="firstname">Prénom :</label>
                    <input type="text" id="firstname" className="form-Input" value="Martine"/>
                </div>
                <div className="form-Block">
                    <label htmlFor="lastname">Nom :</label>
                    <input type="text" id="lastname"className="form-Input" value="test"/>
                </div>
                <div className="profil-Block">
                    <div className="profil-Button">
                        <img src={userImg} alt="" className="profil-img"></img>
                        <input type="file" id="file" className="input-file"></input>
                    </div>
                    <div className="form-Block">
                        <label htmlFor="account">Type de compte :</label>
                        <input type="text" id="account" disabled="disabled" className="form-Input" value="Utilisateur"/>
                        <label htmlFor="created">Créer le :</label>
                        <input type="text" id="created" disabled="disabled" className="form-Input" value="22/10/2002"/>
                    </div>
                </div>
                <div className="profil-Block borderTop">
                    <button className="btnUpdate">Modifier le profil</button>
                    <button className="btnDelete">Supprimer votre profil</button>
                </div>
            </form>
        </div>
    )
}

export default Profile;