import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getArticleList, setArticleList } from '../store/articleList'
import { withRouter } from 'react-router-dom'
import './ArticleList.css'
import InfiniteScroll from 'react-infinite-scroller';
import { List, Spin } from 'antd';
import ArticleInfo from '../components/ArticleInfo'

const ArticleList = connect(state => ({
    articleList: state.articleList
}), {
    getArticleList, setArticleList
})(withRouter(class extends Component {
    /**
     * 通过这次分页滚动加载组件编写，我了解到：
     *   1. 多个setState更新（setState是异步更新）可能会被合并成一个，以最后一个为主
     *   2. 在setState中将参数改为函数，而不是对象，能确保state是目前最新的那个state
     *   3. setState是异步的，如果在请求成功后的函数中setState，那么那个时候取到的state是在上级作用域中查找，而导致state可能是旧的state，不是最新的（因为在请求返回之前，可能有其他一系列操作更新了state），所以要用函数参数形式确保是最新的state
     */
    constructor(props) {
        super(props);
        // console.log("刷新", id, state, articleList);
        this.state = {
            hasMore: true,
            loading: false,
            page: 1
        }
    }
    handleInfiniteOnLoad = () => {
        // console.log("分页请求", state);
        const { category: id, k, articleList, getArticleList } = this.props;
        const { page } = this.state;
        this.setState(lastState => ({
            ...lastState,
            loading: true
        }));
        getArticleList(id, page, k).then(res => {
            // console.log("请求成功");
            const { rows, count } = res.data.data;
            if (count === articleList.length + rows.length) {
                // 文章已经全部加载完毕
                this.setState(lastState => {
                    return {
                        hasMore: false,
                        loading: false,
                        page: lastState.page + 1,
                    };
                })
            } else {
                this.setState(lastState => {
                    return {
                        hasMore: true,
                        loading: false,
                        page: lastState.page + 1
                    };
                })
            }
        });
    };
    // 因为props中的page，和控制分页加载数据的state都会导致组件刷新，所以需要对id单独判断，如果是id变量改变，即分类改变了，则应该将articleList等数据恢复初值
    componentDidUpdate(prevProps) {
        const { setArticleList } = this.props;
        if (this.props.category !== prevProps.category) {
            // console.log("id改变");
            setArticleList([]);
            this.setState({
                hasMore: true,
                loading: false,
                page: 1
            }, () => {
                this.handleInfiniteOnLoad();
            });
        } else if (this.props.k !== prevProps.k) {
            // console.log("key改变");
            setArticleList([]);
            this.setState({
                hasMore: true,
                loading: false,
                page: 1
            }, () => {
                this.handleInfiniteOnLoad();
            });
        }
    }
    componentDidMount() {
        // console.log("初始化第一次请求");
        this.handleInfiniteOnLoad();
    }
    componentWillUnmount() {
        const { setArticleList } = this.props;
        setArticleList([]);
    }

    render() {
        const { loading, hasMore } = this.state;
        const { articleList, history } = this.props;
        return (
            <div className="articlelist-container">
                {/**
                 * initialLoad:true   刚进来就执行一次loadMore中的方法
                 * pageStart:0        初始页为0，但是执行loadMore方法的初始值是1
                 * hasMore            必须要loading状态和hasMore本身一起判断，loading的时候会改变state值导致重新刷新，如果只有hasMore就会继续分页请求，所以需要loading态一起控制
                 */}
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!loading && hasMore}
                    useWindow={true}
                >
                    <List
                        dataSource={articleList}
                        size="large"
                        itemLayout="vertical"
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                className='article-list-item'
                                onClick={() => { history.push(`/article/${item.id}`) }}
                            >
                                <img src={item.cover} alt="" />
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                                <ArticleInfo category={item.Category.name} author={item.author} browse={item.browse} />
                            </List.Item>
                        )}
                    >
                        {/* 正在加载下一页的文章 */}
                        {loading && hasMore && (
                            <div className="demo-loading-container">
                                <Spin />
                            </div>
                        )}
                    </List>
                </InfiniteScroll>
            </div >
        )
    }
}))

export default ArticleList