import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Components
import Login from './Components/Login'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Login" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
