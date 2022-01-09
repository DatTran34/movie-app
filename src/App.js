import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import MovieInfoPage from "./pages/MovieInfoPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/movie" component={MovieInfoPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
