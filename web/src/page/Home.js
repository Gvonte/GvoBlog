import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, BackTop } from 'antd';
import GHeader from '../components/GHeader'
import './Home.css'

const Article = React.lazy(() => import('./Article'));
const About = React.lazy(() => import('./About'));

const { Header, Footer, Content } = Layout;

function Home() {
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <BackTop />
        <Header className="home-header"><GHeader /></Header>
        <Content className="home-content">
          <Switch>
            <Route exact path="/" component={Article} />
            <Route path="/article" component={Article} />
            <Route path="/about" component={About} />
          </Switch>
        </Content>
        <Footer className="home-footer">www.gvoblog.com - Blog System Copyright© Author Gvonte</Footer>
      </Layout >
    </div >
  );
}

export default Home;
