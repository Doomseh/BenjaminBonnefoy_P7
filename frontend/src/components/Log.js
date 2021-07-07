import { useHistory } from "react-router-dom";

function Logform({btnName}) {

    let history = useHistory();

    return (
        <form className="form">
            <div className="form-Block">
                <label htmlFor="email">Email :</label>
                <input type="email" id="email" className="form-Input"/>
            </div>
            <div className="form-Block">
                <label htmlFor="password">Mot de passe :</label>
                <input type="password" id="password" className="form-Input"/>
            </div>
            <button className="btnLog" onClick={() => history.push("/profile")}>{btnName}</button>
        </form>
    )
}

export default Logform;