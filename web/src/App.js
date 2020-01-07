import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css'
import Home from './page/Home'
import Login from './page/Login'
import Register from './page/Register'
// import test from './components/test'

function App() {
  return (
    <div className="app-container">
      <Switch>
        {/* <Route path="/test" component={test} /> */}
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
