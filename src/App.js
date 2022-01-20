import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import MovieInfoPage from "./pages/MovieInfoPage";
import MovieInfoPage2 from "./pages/MovieInfoPage2";
import TvShowInfoPage from "./pages/TvShowInfoPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import PersonPage from "./pages/PersonPage";
import PersonInfoPage from "./pages/PersonInfoPage";
import PersonInfoPage2 from "./pages/PersonInfoPage2";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/movie/:id" component={MovieInfoPage2}></Route>
          <Route exact path="/tv/:id" component={TvShowInfoPage}></Route>
          <Route exact path="/person/:id" component={PersonInfoPage}></Route>
          <Route path="/person/:content" component={PersonPage}></Route>
          <Route path="/filter" component={SearchPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
