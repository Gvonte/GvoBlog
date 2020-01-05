import React from 'react'
import { connect } from 'react-redux'
import { register } from '../store/user'
import { Link } from 'react-router-dom'
import './Register.css'
import { Form, Input, Button, message } from 'antd';

const Login = connect(null, {
    register
})(Form.create({})(function (props) {
    const { history, register, form } = props;
    const { getFieldDecorator, validateFields } = form;
    const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                register(values).then((res) => {
                    // 注册成功
                    message.success(res.data.msg);
                    history.push('/login');
                }).catch(err => {
                    // 注册失败
                    message.error(err.respone.data.msg);
                })
            }
        });
    };
    return (
        <div className="back" style={{ height: document.documentElement.clientHeight || document.body.clientHeight }}>
            <div className="back1"></div>
            <Form onSubmit={handleSubmit} className="register-container">
                <h1>GvoBlog</h1>
                <h2>一个共同成长的平台</h2>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [
                            { required: true, message: '请输入用户名!' },
                            { min: 6, max: 14, message: '用户名在6~14位!' }
                        ]
                    })(
                        <Input placeholder="用户名（6~14位）" className="input" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: '请输入密码!' },
                            { min: 6, max: 14, message: '密码在6~14位!' }
                        ]
                    })(
                        <Input.Password placeholder="密码（6~14位）" className="input" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [
                            { type: 'email', message: '请输入正确的邮箱格式!' },
                            { required: true, message: '请输入邮箱!' }
                        ]
                    })(
                        <Input placeholder="邮箱" className="input" />
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit" className="btn">注册</Button>
                <p className="login">已有账号？<Link to="/login">去登录</Link></p>
            </Form>
        </div>
    )
}))

export default Login