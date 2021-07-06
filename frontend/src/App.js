import Accueil from "./components/Acceuil";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {
  return  (<div>
    <Router>
      <Navigation />
        <Switch>
          <Route path="/" exact component={Accueil} />
          <Route path="/Inscription" exact component={Signup} />
          <Route path="/Connexion" exact component={Login} />
          <Route path="/Profile" exact component={Profile} />
        </Switch>
    </Router>
  </div>)
}

export default App;
