import React, { Component } from 'react'
import UserMenu from "./UserMenu"
import {Link} from "react-router-dom"

class ProfileBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open_menu: 0,
        }
		this.openMenu = this.openMenu.bind(this)
    }

    openMenu = () => {
        this.setState({open_menu: (this.state.open_menu ? 0 : 1)})
    }

    render() {
        return (
            <div className="profile-block">
                <div className="flex">
                    <Link to={"/profile/" + this.props.member.profile.id}>
                        {this.props.member.profile.avatar!=null?
                            (<img src={this.props.member.profile.avatar} className="avatar"/>) :
                            (<div className="base-avatar"></div> )}
                    </Link>
                    <div className="open-btn" onClick={this.openMenu}><i className="el-icon-arrow-down"></i></div>
                </div>
                {this.state.open_menu?(<UserMenu closeMenu={this.openMenu}/>):null}
            </div>
        )
    }
}

export default ProfileBlock
