import React from 'react'
import { connect } from 'react-redux'
import { login } from '../store/user'
import {Link} from 'react-router-dom'
import './Login.css'
import { Form, Input, Button, message } from 'antd';

const Login = connect(null, {
    login
})(Form.create({})(function (props) {
    const { history, login, form } = props;
    const { getFieldDecorator, validateFields } = form;
    const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                login(values).then(() => {
                    // 登录成功      
                    message.success("登录成功");
                    history.push('/');
                }).catch(err => {
                    // 登录失败
                    message.error(err.response.data.msg);
                })
            }
        });
    };
    return (
        <div className="back" style={{ height: document.documentElement.clientHeight || document.body.clientHeight }}>
            <div className="back1"></div>
            <Form onSubmit={handleSubmit} className="login-container">
                <h1>GvoBlog</h1>
                <h2>一个共同成长的平台</h2>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名!' }]
                    })(
                        <Input placeholder="用户名" className="input" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }]
                    })(
                        <Input.Password placeholder="密码" className="input" />
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit" className="btn">登录</Button>
                <p className="register">没有账号？<Link to="/register">去注册</Link></p>
            </Form>
        </div>
    )
}))

export default Login