import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getArticle } from '../store/article'
import './ArticleId.css'
import { Icon, Comment, Avatar, Input, Button, Modal, message } from 'antd'
import ArticleInfo from '../components/ArticleInfo'
import createComment from '../service/createComment'
import deleteComment from '../service/deleteComment'
import Markdown from 'react-markdown'
import moment from 'moment'

const { TextArea } = Input;
const { confirm } = Modal;

moment.locale('zh-cn', {
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '几秒',
        ss: '%d秒',
        m: '1分钟',
        mm: '%d分钟',
        h: '1小时',
        hh: '%d小时',
        d: '1天',
        dd: '%d天',
        M: '1个月',
        MM: '%d个月',
        y: '1年',
        yy: '%d年'
    },
});

const ArticleId = connect(state => ({
    article: state.article
}), {
    getArticle
})(function (props) {
    const { match: { params: { id } }, article, getArticle, history } = props;
    useEffect(() => {
        getArticle(id).then(res=>{
            console.log(res.data.data.article.content.slice(0,2000));
            
        });
    }, [getArticle, id]);
    const [comment, setComment] = useState('')
    const onChange = (e) => {
        setComment(e.target.value)
    }
    const onSubmit = () => {
        if (!comment) {
            return
        }
        if (localStorage.getItem('user_info')) {
            createComment({ content: comment, ArticleId: id }).then(() => {
                message.success("评论成功！");
                setComment('')
                getArticle(id);
            }).catch();
        } else {
            confirm({
                title: '登陆后添加评论',
                content: '是否跳转到登录页',
                okText: '是',
                cancelText: '否',
                onOk() {
                    history.push('/login')
                }
            });
        }
    }
    const delComment = cid => {
        confirm({
            title: '删除评论',
            content: '确定删除吗',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                deleteComment(cid).then((res) => {
                    message.success("删除成功！");
                    getArticle(id);
                })
            }
        });
    }
    return (
        <div className='articleid-container'>
            <h1 className='title'>{article.title}</h1>
            <div className='detail'>
                <ArticleInfo style={{ textAlign: 'center' }} category={article.category} author={article.author} browse={article.browse} />
                <Icon type="message" className='icon' />
                <span className='iconfont'>{article.comment.length}</span>
            </div>
            <Markdown className='content' source={article.content} />
            {article.comment.length ? <p className='comment-title'>
                <Icon type="alert" />&nbsp;
                {`${article.comment.length}条评论`}
            </p> : ''}
            <TextArea rows={4} onChange={onChange} value={comment} />
            <Button htmlType="submit" onClick={onSubmit} type="primary" className="btn">添加评论</Button>
            {article.comment.map(item => (
                <Comment
                    key={item.id}
                    className='comment-container'
                    actions={
                        ((item.User && item.User.username) || 'user') === (localStorage.getItem('user_info') && JSON.parse(localStorage.getItem('user_info')).info.username) ?
                            [<span onClick={() => { delComment(item.id) }}>删除</span>, <span key="comment-nested-reply-to">点击回复</span>] : [<span key="comment-nested-reply-to">点击回复</span>]
                    }
                    author={<span>{(item.User && item.User.username) || 'user'}</span>}
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt={(item.User && item.User.username) || 'user'}
                        />
                    }
                    content={
                        <p>{item.content}</p>
                    }
                    datetime={(
                        <span>
                            {moment(item.updatedAt).startOf('second').fromNow()}
                        </span>
                    )}
                >
                    {item.Replies.map((i, index) => (
                        <Comment
                            key={index}
                            className='comment-container'
                            actions={[<span key="comment-nested-reply-to">点击回复</span>]}
                            author={<span>{(i.User && i.User.username) || 'user'}</span>}
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt={(i.User && i.User.username) || 'user'}
                                />
                            }
                            content={
                                <p>{i.content}</p>
                            }
                            datetime={(
                                <span>
                                    {moment(i.updatedAt).startOf('second').fromNow()}
                                </span>
                            )}
                        ></Comment>
                    ))}
                </Comment>
            ))}
        </div>
    )
})

export default ArticleId