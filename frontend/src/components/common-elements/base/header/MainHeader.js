import React, { Component } from 'react'
import Logo from "./Logo"
import CiteMenu from "./CiteMenu"
import CiteSearch from "./CiteSearch"
import ProfileBlock from "./ProfileBlock"
import '../../style/cite-header.css'
import NotificationsSection_wrap from "../../../../store/wraps/room-page/NotificationsSection_wrap"

class MainHeader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header className="main-header">
                <Logo/>
                <CiteMenu active_section={this.props.main_section}/>
                <CiteSearch/>
                <div className="flex-end">
                    <ProfileBlock member={this.props.member} changeMode={this.props.changeMode}/>
                    <NotificationsSection_wrap/>
                </div>
            </header>
        )
    }
}

export default MainHeader
