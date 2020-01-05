import React from 'react'
import './ArticleInfo.css'
import { Tag, Icon } from 'antd';

const ArticleInfo = React.memo(function (props) {
    const { category, author, browse } = props;
    return (
        <div className='articleinfo-container' >
            <Tag color="rgb(234, 241, 255)" className="category">{category}</Tag>
            <Icon type="user" className="icon" />
            <span className="iconfont">{author}</span>
            <Icon type="eye" className="icon" />
            <span className="iconfont">{browse}</span>
        </div>
    )
})

export default ArticleInfo