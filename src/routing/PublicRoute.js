import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom'

function PublicRoute({ component: Component, ...children }) {
        return <Redirect to="filter?media_type=movie&category=Popular&page=1" />;
  }
  
export default PublicRoute;