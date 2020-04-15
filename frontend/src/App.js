import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Components
import Home from './Components/Home'
import Login from './Components/Login'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Login" exact component={Login} />
        <Route path="/Home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
