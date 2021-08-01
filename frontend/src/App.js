import Accueil from "./components/accueil/accueil";
import Login from "./components/login-signup/login";
import Signup from "./components/login-signup/signup";
import Navigation from "./components/navigation/navigation";
import Profile from "./components/profile/profile";
import Publication from "./components/publication/publication";
import NewPost from "./components/newpost/newpost";
import Home from "./components/home/home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

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
          <Route path="/post" exact component={Publication} />
        </Switch>
    </Router>
  </div>)
}

export default App;
