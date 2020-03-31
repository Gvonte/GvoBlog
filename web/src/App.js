import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';

const Home = React.lazy(() => import('./page/Home'))
const Register = React.lazy(() => import('./page/Register'))
const Login = React.lazy(() => import('./page/Login'))

function App() {
  return (
    <div>
      <Suspense fallback={<div style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}><Spin /></div>}>
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
