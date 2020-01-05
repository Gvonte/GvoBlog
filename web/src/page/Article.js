import React from "react";
import './Article.css'
import { Route, Switch } from 'react-router-dom'
import { Row, Col } from 'antd';
import Advertise from '../components/Advertise'
import ArticleIndex from './ArticleIndex'
import ArticleCreate from './ArticleCreate'
import ArticleId from './ArticleId'

function Article() {
    return (
        <div className="page-article-container">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={18}>
                    <Switch>
                        <Route exact path="/" component={ArticleIndex} />
                        <Route exact path="/article" component={ArticleIndex} />
                        <Route path="/article/create" component={ArticleCreate} />
                        <Route path="/article/:id" component={ArticleId} />
                    </Switch>
                </Col>
                <Col span={6}>
                    <Advertise />
                </Col>
            </Row>
        </div>
    )
}

export default Article