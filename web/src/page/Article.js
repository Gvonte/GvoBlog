import React from "react";
import './Article.css'
import { Route, Switch } from 'react-router-dom'
import Advertise from '../components/Advertise'

const ArticleIndex = React.lazy(() => import('./ArticleIndex'))
const ArticleCreate = React.lazy(() => import('./ArticleCreate'))
const ArticleId = React.lazy(() => import('./ArticleId'))

function Article() {
    return (
        <div className="page-article-container">
            <div className="left-container">
                <Switch>
                    <Route exact path="/" component={ArticleIndex} />
                    <Route exact path="/article" component={ArticleIndex} />
                    <Route path="/article/create" component={ArticleCreate} />
                    <Route path="/article/:id" component={ArticleId} />
                </Switch>
            </div>
            <div className="right-container">
                <Advertise />
            </div>
        </div>
    )
}

export default Article