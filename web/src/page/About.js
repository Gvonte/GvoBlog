import React from "react";
import './About.css'

function About() {
    return (
        <div className="page-about-container">
            <span className="img"></span>
            <p className="first-p">Hello，欢迎您来到这里，您可以叫我<strong>阿金</strong>，也可以叫我<strong>Gvonte</strong>，这个网站是属于我的个人博客网站，同时也在 <a href="https://github.com/Gvonte">Github</a> 上开源了此项目代码。您有兴趣也可以在 <a href="https://github.com/Gvonte">GitHub</a> 上进行进一步的交流。本人平时会在此网站上发布一些自己学习的<strong>心得和笔记</strong>（主要针对<strong>前端开发</strong>），也欢迎您提出宝贵的意见</p>
            <p>博客的内容：积极向上的文章。</p>
            <p>博客的愿景：和更多的朋友一起学习进步。</p>
            <p>博客的风格：简约至上。</p>
            <p className="last-p">最后，祝大家每天开心，每天幸福！</p>
        </div>
    );
}
export default About