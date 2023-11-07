import React, { Component } from 'react'
import Snowflake from "./Snowflake"
import FullScreenWindow from "../FullScreenWindow"
import Profile from "../../../member/profile/Profile"
import "../../../../../static/frontend/images/winter-cticker.png"
import "../../../../../static/frontend/images/fox-and-butterfly.png"
import "../../../../../static/frontend/images/fish.png"
import "../../../../../static/frontend/images/blue-flower.png"
import "../../../../../static/frontend/images/pink-flower.png"
import "../../../../../static/frontend/images/cat.png"

class MegafonMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile_window: 0,
            opacity: false,
        }
        this.openProfile = this.openProfile.bind(this)
    }

    componentDidMount() {
        const set_opacity = () => {this.setState({opacity: true})}
        setTimeout(function(){set_opacity()},24100)
    }

    openProfile = () => {
        this.setState({profile_window: (this.state.profile_window ? 0 : 1)})
    }

    render() {
        let illustration = ""
        if (this.props.message.style == "summer") {
            illustration = <img
                src="../../../../../static/frontend/images/fox-and-butterfly.png"
                className="megafon-msg-image"/>
        } else if (this.props.message.style == "colors") {
            illustration = <img src="https://3.downloader.disk.yandex.ru/preview/b5599b05776754f802eb5dc52d62e8feb56cdc01f62b61162b8a1ec7565c44dc/inf/O_wwQdZwr5PCjKrl8F3UxPmsIXXX9TqQY4lcCnWKwq4ww5tYDFw7NkgzU0SJBOihy9kvj87OviPM6-PVKEFX3g%3D%3D?uid=1484373914&filename=wow.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=1484373914&tknv=v2&size=1297x648"
                                className="megafon-msg-image"/>
        } else if (this.props.message.style == "winter") {
            illustration = <img
                src="../../../../../static/frontend/images/winter-cticker.png"
                className="megafon-msg-image"/>
        } else if (this.props.message.style == "fish") {
            illustration = <img
                src="../../../../../static/frontend/images/fish.png"
                className="megafon-msg-image"/>
        } else if (this.props.message.style == "blue-flower") {
            illustration = <img
                src="../../../../../static/frontend/images/blue-flower.png"
                className="megafon-msg-image"/>
        } else if (this.props.message.style == "pink-flower") {
            illustration = <img
                src="../../../../../static/frontend/images/pink-flower.png"
                className="megafon-msg-image"/>
        } else if (this.props.message.style == "cat") {
            illustration = <img
                src="../../../../../static/frontend/images/cat.png"
                className="megafon-msg-image"/>
        }
        return (
            <div className="">
                {this.state.profile_window ? (
                    <FullScreenWindow
                        children={<Profile id={this.props.message.author.id}
                                           closeWindow={this.openProfile}/>}/>) : null}
                <div className={"megafon-message " + this.props.message.style + "-megafon-message" + (this.state.opacity?" hidden": "")}>
                    {illustration}
                    <div className="moving-line">
                        <p>{this.props.message.text}</p>
                    </div>
                    <span className="author" onClick={this.openProfile}>{this.props.message.author.name}</span>
                </div>
                <Snowflake type={this.props.message.style}/>
            </div>
        )
    }
}

export default MegafonMessage
