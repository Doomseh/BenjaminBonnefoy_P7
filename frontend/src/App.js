// Récupération de toutes les routes
import Accueil from "./components/accueil/Accueil";
import Login from "./components/login-signup/Login";
import Signup from "./components/login-signup/Signup";
import Navigation from "./components/navigation/Navigation";
import Profile from "./components/profile/Profile";
import Publication from "./components/publication/Publication";
import NewPost from "./components/newpost/Newpost";
import UpdatePost from "./components/newpost/UpdatePost";
import Home from "./components/home/Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


// Mise en place de l'application avec le router
function App() {
  return  (<div>
    <Router>
      <Navigation />
        <Switch>
          <Route path="/" exact component={Accueil} />
          <Route path="/Inscription" exact component={Signup} />
          <Route path="/Connexion" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/home" exact component={Home} />
          <Route path="/newpost" exact component={NewPost} />
          <Route path="/updatePost" exact component={UpdatePost} />
          <Route path="/post" exact component={Publication} />
        </Switch>
    </Router>
  </div>)
}

export default App;
