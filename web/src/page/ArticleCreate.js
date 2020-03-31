import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getCategory } from '../store/category'
import { Redirect } from 'react-router-dom'
import './ArticleCreate.css'
import { Form, Input, Button, Icon, Upload, message, AutoComplete } from 'antd'
import uploadFile from '../service/uploadFile'
import uploadImg from '../service/uploadImg'

import createArticle from '../service/createArticle'

const ArticleCreate = connect(state => ({
    category: state.category,
    userInfo: state.user
}), {
    getCategory
})((Form.create({})(function (props) {
    const { userInfo } = props;
    if (!userInfo.token) {
        return <Redirect to="/login" />
    } else if (userInfo.info.username !== 'admin1') {
        message.error('很抱歉，您没有新建博客的权限');
        return <Redirect to="/" />
    } else {
        const { category, getCategory, form, history } = props;
        const { getFieldDecorator, validateFields } = form;
        const [upload, setUpload] = useState([]);
        const [datasource, setDatasource] = useState([])
        useEffect(() => {
            if (category.length === 0) {
                getCategory();
            }
        }, [category.length, getCategory]);
        const handleSubmit = async e => {
            e.preventDefault();
            validateFields((err, values) => {                
                let { title, description, CategoryId, content } = values;
                if (!err) {
                    CategoryId = category.find(item => item.name === CategoryId).id;
                    content = content.file.response.file;
                    createArticle({ title, description, CategoryId, content }).then(res => {
                        message.success("新建文章成功");
                        history.push(`/article/${res.data.data.id}`);
                    }).catch(err => {
                        message.error(err.response.data.msg);
                    })
                }
            });
        };
        const onSearch = (searchText) => {
            const data = category.map(item => item.name);
            if (!searchText) {
                setDatasource(data);
            } else {
                setDatasource(data.filter(item => item.toLowerCase().includes(searchText.toLowerCase())));
            }
        };
        return (
            <Form onSubmit={handleSubmit} className="articlecreate-container"
                labelAlign="left"
                labelCol={{ md: { span: 3 }, lg: { span: 2 } }}
                wrapperCol={{ md: { offset: 3 }, lg: { offset: 2 } }}
                layout="horizontal">
                <Form.Item label="标题">
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入标题!' }]
                    })(
                        <Input className="input" />
                    )}
                </Form.Item>
                <Form.Item label="描述">
                    {getFieldDecorator('description', {
                        rules: [{ required: true, message: '请输入描述!' }]
                    })(
                        <Input className="input" />
                    )}
                </Form.Item>
                <Form.Item label="分类">
                    {getFieldDecorator('CategoryId', {
                        rules: [
                            { required: true, message: '请输入分类!' },
                            {
                                validator(rule, value) {
                                    const categories = category.map(item => item.name);
                                    return categories.includes(value)
                                },
                                message: '请输入正确的分类！',
                            }
                        ]
                    })(
                        <AutoComplete dataSource={datasource} onSearch={onSearch} onFocus={onSearch}>
                            <Input className="input" />
                        </AutoComplete>
                    )}
                </Form.Item>
                <Form.Item label="上传">
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: '请上传内容!' }]
                    })(
                        <Upload
                            name='file'
                            customRequest={options => {
                                uploadFile(options.file).then(res => {
                                    options.onSuccess(res.data.data);
                                });
                            }}
                            fileList={upload}
                            onChange={(info) => {
                                if (info.fileList.length === 0) {
                                    setUpload([])
                                } else {
                                    setUpload([info.file])
                                }
                            }}
                        >
                            <Button >
                                <Icon type="upload" />上传博客（MD文件）
                        </Button>
                        </Upload>
                    )}
                </Form.Item>
                <Form.Item label="传图片">
                    <Upload
                        name='img'
                        customRequest={options => {
                            uploadImg(options.file).then(res => {
                                options.onSuccess(res.data.data);
                            });
                        }}
                    >
                        <Button >
                            <Icon type="upload" />上传图片
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="btn">新建博客</Button>
                </Form.Item>
            </Form>
        )
    }
})))

export default ArticleCreate