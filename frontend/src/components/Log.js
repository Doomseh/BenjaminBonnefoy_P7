import { useHistory } from "react-router-dom";

function Logform({btnName}) {

    const history = useHistory();

    return (
        <form className="form">
            <div className="form-block">
                <label htmlFor="email">Email :</label>
                <input type="email" id="email" className="form-input"/>
            </div>
            <div className="form-block">
                <label htmlFor="password">Mot de passe :</label>
                <input type="password" id="password" className="form-input"/>
            </div>
            <button className="btnLog" onClick={() => history.push("/profile")}>{btnName}</button>
        </form>
    )
}

export default Logform;