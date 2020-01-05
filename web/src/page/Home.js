import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, BackTop } from 'antd';
import Article from './Article'
import About from './About'
import GHeader from '../components/GHeader'
import './Home.css'

const { Header, Footer, Content } = Layout;

function Home() {
  const [h, setH] = useState(document.documentElement.clientHeight || document.body.clientHeight);
  window.onresize = () => {
    setH(document.documentElement.clientHeight || document.body.clientHeight)
  };
  return (
    <div>
      <Layout style={{ minHeight: h }}>
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
