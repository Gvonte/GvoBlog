import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './Advertise.css'
import { Card, Icon } from 'antd';
import CardTitle from './CardTitle'
// import getAdvertise from '../service/getAdvertise'
import { getAdvertise } from '../store/advertise'

const Advertise = connect(state => ({
    ads: state.advertise
}), {
    getAdvertise
})(function (props) {
    const { ads, getAdvertise } = props
    useEffect(() => {
        getAdvertise();
    }, [getAdvertise]);
    return (
        <div className="advertise-container">
            <Card
                title={<CardTitle type="bars" class="card-title" title="广告" />}
                loading={ads.length === 0}
                className="card"
                bodyStyle={{ padding: '10px 24px' }}
            >
                {ads.map(item => {
                    return (
                        <div key={item.id} className="link-container">
                            <a href={item.link} className="link">{item.title}</a>
                            <Icon type="right" className="arrow" />
                        </div>
                    )
                })}
            </Card>
            <Card
                title={<CardTitle type="api" class="card-title" title="链接" />}
                className="card"
                bodyStyle={{ padding: '10px 24px' }}
            >
                <div className="link-container">
                    <a href="https://github.com/Gvonte" className="link">My GitHub</a>
                    <Icon type="right" className="arrow" />
                </div>
            </Card>
        </div>
    )
})

export default Advertise