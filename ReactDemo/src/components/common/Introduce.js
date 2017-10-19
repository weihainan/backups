import React from 'react'

export default class myIntroduce extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="ani-box">
                Designed as Ant Design，提炼和服务企业级中后台产品的交互语言和视觉风格。

                <ul id="outlinks">
                    <li><a href="https://www.baidu.com" target="_blank">百 度</a></li>
                    <li><a href="https://www.google.com.hk" target="_blank">谷 歌</a></li>
                    <li><a href="https://pan.baidu.com/" target="_blank">百度云<span class="badge">常用</span></a></li>
                    <li><a href="http://www.cnblogs.com/wihainan/" target="_blank">博客园<span class="badge">常用</span></a></li>
                    <li><a href="http://www.kjson.com/" target="_blank">Json格式工具</a></li>
                    <li><a href="http://tool.chinaz.com/Tools/unixtime.aspx" target="_blank">时间戳</a></li>
                    <li><a href="http://base64.xpcha.com" target="_blank">Base64</a></li>
                    <li><a href="http://www.runoob.com" target="_blank">菜鸟</a></li>
                    <li><a href="https://docs.mongodb.com/manual/reference/method/" target="_blank">Mongo文档</a></li>
                    <li><a href="https://passport.csdn.net" target="_blank">CSDN</a></li>
                    <li><a href="http://element.eleme.io/#/zh-CN/component/installation" target="_blank">Element-UI</a></li>
                    <li><a href="https://github.com/weihainan" target="_blank">GitHub</a></li>
                    <li><a href="http://mvnrepository.com" target="_blank">MvnRepository</a></li>
                    <li><a href="http://tool.oschina.net/encode" target="_blank">Html-Encode</a></li>
                    <li><a href="http://www.yilan.io/home/" target="_blank">一览</a></li>
                    <li><a href="http://www.cnblogs.com/skywang12345/p/java_threads_category.html" target="_blank">多线程</a></li>
                </ul>
            </div>
        )
    }
}
