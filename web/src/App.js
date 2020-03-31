import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css'
import { Spin } from 'antd';

const Home = React.lazy(() => import('./page/Home'))
const Register = React.lazy(() => import('./page/Register'))
const Login = React.lazy(() => import('./page/Login'))

function App() {
  return (
    <div className="app-container">
      <Suspense fallback={<div class="middle"><Spin /></div>}>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
