import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getCategory } from '../store/category'
import './ArticleIndex.css'
import { Tag } from 'antd'
import ArticleList from '../components/ArticleList'

const { CheckableTag } = Tag;

const ArticleIndex = connect(state => ({
    tags: state.category
}), {
    getCategory
})(function (props) {
    const { tags, getCategory, location, history } = props;
    let key = /key=(.+)/.exec(location.search);
    if (key) {
        // 对传入的key值处理
        key = key[1];
    }
    let curTag = /category=(\d+)/.exec(location.search);
    curTag = curTag ? Number(curTag[1]) : 0; //当前选中的分类的id
    const [showTags, setShowTags] = useState([]); //当前展示的分类有哪些
    useEffect(() => {
        if (tags.length === 0) {
            getCategory().then(res => {
                setShowTags(res.data.data.slice(0, 8));
            })
        } else {
            setShowTags(tags.slice(0, 8));
        }
    }, [getCategory, tags]);
    const extend = () => {
        setShowTags(tags);
    }
    const reduce = () => {
        setShowTags(tags.slice(0, 8));
    }
    return (
        <div className="articleindex-container">
            <div className="tag-container">
                <CheckableTag
                    key={0}
                    className="tag"
                    checked={curTag === 0}
                    onChange={() => { history.push('/article') }}
                >
                    全部
                </CheckableTag>
                {showTags.map(item => {
                    return (
                        <CheckableTag
                            key={item.id}
                            className="tag"
                            checked={item.id === curTag}
                            onChange={() => { history.push(`/article?category=${item.id}`) }}
                        >
                            {item.name}
                        </CheckableTag>
                    )
                })}
                {tags.length === 0 ? "" : tags.length !== showTags.length ? (<CheckableTag
                    key={-1}
                    className={["extend", "tag"]}
                    onChange={extend}
                >
                    展开
                </CheckableTag>) : (<CheckableTag
                        key={-2}
                        className={["reduce", "tag"]}
                        onChange={reduce}
                    >
                        收起
                </CheckableTag>)}
            </div>
            <ArticleList category={curTag} k={key} />
        </div>
    )
})

export default ArticleIndex