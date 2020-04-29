import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Components
import Home from './Components/Home'
import Login from './Components/Login'
import AdminHome from './Components/AdminHome'
import Auth from './Helpers/Auth'
import Control from './Components/Control'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Login" exact component={Login} />
        <Auth>
          <Route path="/" exact component={Control} />
          <Route path="/Home" component={Home} />
          <Route path="/Admin" exact component={AdminHome} />
        </Auth>  
      </Switch>
    </Router>
  );
}

export default App;
