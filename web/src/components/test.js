import React, { useState, useEffect } from 'react'

export default function (props) {
    // test

    // const [num, setN] = useState(0);
    // console.log(num);
    // if (num === 0) {
    //     setN(1);

    // } 
    // console.log(num);



    const [state, setState] = useState({
        articleList: [],
        hasMore: true,
        loading: false,
        page: 1
    });
    console.log("刷新", state);
    const handleInfiniteOnLoad = () => {
        console.log("分页请求", state);
        setState(lastState => ({
            ...lastState,
            loading: true
        }));
        setTimeout(() => {
            console.log("请求成功");
            setState(lastState => {
                console.log(lastState);
                return {
                    hasMore: false,
                    loading: false,
                    page: lastState.page + 1,
                    articleList: ['test'],
                };

            })
        }, 1000);
    };
    useEffect(() => {
        console.log("id改变");
        setState({
            articleList: [11],
            hasMore: true,
            loading: false,
            page: 1
        });
        setTimeout(() => {
            handleInfiniteOnLoad();
        }, 0)
    }, []);


    return (
        <div>123</div>
    )
}