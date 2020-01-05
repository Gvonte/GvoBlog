import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import user from './user'
import advertise from './advertise'
import category from './category'
import articleList from './articleList'
import article from './article'

const store = createStore(
    combineReducers({ user, advertise, category, articleList, article }),
    applyMiddleware(thunk)
)

export default store;