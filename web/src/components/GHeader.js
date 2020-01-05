import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../store/user'
import { withRouter } from 'react-router-dom'
import './GHeader.css'
import { Menu, Input, Icon, Button } from 'antd';

const { Search } = Input;

const GHeader = connect(state => ({
    userInfo: state.user
}), {
    logout
})(withRouter(function (props) {
    const { history, location, userInfo, logout } = props;
    const keyAry = [
        { path: '/article', name: "文章" },
        { path: '/about', name: "关于" }
    ];
    const str = '/' + location.pathname.split('/')[1];
    const selectedPath = str === '/' ? '/article' : str;
    const handleClick = e => {
        history.push(e.key);
    }
    const handleSubmit = val => {
        if (val) {
            history.push(`/article?key=${val}`);
        }
    }
    return (
        <div className="header-container" >
            <div className="left">
                <h1 className="brand" onClick={() => {
                    handleClick({ key: '/' });
                }}>GvoBlog</h1>
                <Menu
                    onClick={handleClick}
                    selectedKeys={selectedPath}
                    mode="horizontal"
                    className="menu"
                >
                    {keyAry.map(item => {
                        return <Menu.Item key={item.path} className="menu-item">{item.name}</Menu.Item>
                    })}
                </Menu>
            </div>
            <div>
                <Search
                    placeholder="搜索你想阅读的文章..."
                    onSearch={handleSubmit}
                    style={{ width: 200 }}
                />
                <Button type="primary" className="btn" onClick={() => { history.push('/article/create') }}>写博客</Button>
                {
                    userInfo.token ?
                        <Icon type="logout" onClick={logout} className="icon logout" />
                        :
                        <Icon type="login" className="icon login" onClick={() => { history.push('/login') }} />

                }
            </div>
        </div >
    )
}))

export default GHeader