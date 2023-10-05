import React, { Component } from 'react'
import ConfirmWindow from "../../../../common-elements/windows/ConfirmWindow"
import FullScreenWindow from "../../../../common-elements/windows/FullScreenWindow";
import Profile from "../../../../member/profile/Profile";

class ModeratorCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirm_window: 0,
            profile_window: 0,
        }
        this.openConfirmWindow = this.openConfirmWindow.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.openProfile = this.openProfile.bind(this)
    }

    openConfirmWindow = () => {
        this.setState({confirm_window: (this.state.confirm_window ? 0 : 1)})
    }

    openProfile = () => {
        this.setState({profile_window: (this.state.profile_window ? 0 : 1)})
    }

    removeItem = () => {
        const remove = () => {this.props.removeItem(this.props.moderator.id)}
        const id = this.props.moderator.id
        $.ajax({
            type: 'post',
            url: '../api/moderator-delete',
            data: {id: id},
            success: function () {
                remove()
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
        this.openConfirmWindow()
    }

    render() {
        return (
            <>
                {this.state.profile_window ? (
                    <FullScreenWindow
                        children={<Profile id={this.props.moderator.id}
                                           closeWindow={this.openProfile}/>}/>) : null}
                <li>
                    {this.state.confirm_window ? (
                        <ConfirmWindow confirm_function={this.removeItem} close={this.openConfirmWindow}/>) : ""}
                    <img src={this.props.moderator.avatar}
                         className="avatar base-avatar"/>
                    <h3 onClick={this.openProfile}>
                        {this.props.moderator.user.is_staff ?
                            (<div className="admin-key" data-title="администратор">
                                <i className="el-icon-key"></i>
                            </div>) : null}
                        {this.props.moderator.name}</h3>
                    {this.props.is_admin && !this.props.moderator.user.is_staff ?
                        (<div className="simple-btn" onClick={this.openConfirmWindow}><i className="el-icon-minus"></i>
                        </div>)
                        : null}
                </li>
            </>
        )
    }
}

export default ModeratorCard
