import React, { Component } from 'react'
import Logo from "../Logo"
import CiteMenu from "../CiteMenu"
import ProfileBlock from "../ProfileBlock"
import NotificationsSection_wrap from "../../../../../store/wraps/room-page/NotificationsSection_wrap"
import MobileSiteSearch from "./MobileSiteSearch"

class MobileMainHeader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header className="main-header">
                <Logo/>
                <CiteMenu active_section={this.props.main_section}/>
                <MobileSiteSearch/>
                <div className="flex-end">
                    <ProfileBlock member={this.props.member}/>
                    <NotificationsSection_wrap/>
                </div>
            </header>
        )
    }
}

export default MobileMainHeader
