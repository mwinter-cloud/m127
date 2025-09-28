import React, {Component} from 'react'
import {Snowflake} from "./Snowflake"
import FullScreenWindow from "../FullScreenWindow"
import Profile from "../../../member/profile/Profile"
import "../../../../../static/frontend/images/winter-cticker.png"
import "../../../../../static/frontend/images/fox-and-butterfly.png"
import "../../../../../static/frontend/images/fish.png"
import "../../../../../static/frontend/images/blue-flower.png"
import "../../../../../static/frontend/images/pink-flower.png"
import "../../../../../static/frontend/images/cat.png"
import "../../../../../static/frontend/images/wow.png"

class MegafonMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile_window_status: 'disabled',
            opacity: false,
        }
        this.openProfile = this.openProfile.bind(this)
    }

    componentDidMount() {
        const set_opacity = () => {this.setState({opacity: true})}
        setTimeout(function() {
			set_opacity()
		}, 24100)
    }

    openProfile = () => {
        this.setState({profile_window_status: (this.state.profile_window_status ? 'disabled' : 'active')})
    }

    render() {
        let illustration = ""
        if (this.props.message.style == "summer") {
            illustration = <img
                src="../../../../../static/frontend/images/fox-and-butterfly.png"
                className="megafon-msg-image"/>
        } else if (this.props.message.style == "colors") {
            illustration = <img src="../../../../../static/frontend/images/wow.png"
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
                {this.state.profile_window_status == 'active' && (
                    <FullScreenWindow
                        children={<Profile id={this.props.message.author.id}
                                           closeWindow={this.openProfile}/>}/>)}
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
