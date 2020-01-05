import React from 'react'
import './CardTitle.css'
import { Icon } from 'antd';

export default function (props) {
    return (
        // icon和文字对齐，display: 'flex'
        <div className="card-title-container">
            <Icon type={props.type} className={props.class} />
            <span className="title">{props.title}</span>
        </div>
    )
}