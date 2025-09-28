import React, {Component} from "react"
import ConfirmWindow from "../../../../common-elements/windows/ConfirmWindow"
import FullScreenWindow from "../../../../common-elements/windows/FullScreenWindow"
import Profile from "../../../../member/profile/Profile"
import axios from "axios"

class ModeratorCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirm_window_status: 'disabled',
            profile_window_status: 'disabled',
			remove_status: 'undefined'
        }
        this.changeConfirmWindowStatus = this.changeConfirmWindowStatus.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.openProfile = this.openProfile.bind(this)
    }

    changeConfirmWindowStatus = () => {
        this.setState({confirm_window_status: (this.state.confirm_window_status == 'active' ? 'disabled' : 'active')})
    }

    openProfile = () => {
        this.setState({profile_window_status: (this.state.profile_window_status == 'active' ? 'disabled' : 'active')})
    }

    removeItem = () => {
        const id = this.props.moderator.id
		const formData = new FormData()
		formData.append('csrfmiddlewaretoken', csrftoken)
		formData.append('id', id)
		axios.post(`${window.location.origin}/api/moderator-delete`, formData).then(() => {
			this.props.removeItem(this.props.moderator.id)
			this.setState({remove_status: 'success'})
		}).catch((data) => {
			this.setState({remove_status: 'error'})
		})
        this.changeConfirmWindowStatus()
    }

    render() {
        return (
            <>
                {this.state.profile_window_status == 'active' && (
                    <FullScreenWindow children={<Profile id={this.props.moderator.id} closeWindow={this.openProfile} />} />)}
                <li>
                    {this.state.confirm_window_status == 'active' && (<ConfirmWindow confirmFunc={this.removeItem} close={this.changeConfirmWindowStatus} />)}
                    {this.props.moderator.avatar ? <img src={this.props.moderator.avatar} className="avatar base-avatar"/> : null}
                    <h3 onClick={this.openProfile}>
                        {this.props.moderator.user.is_staff ?
                            (<div className="admin-key" data-title="администратор"><i className="el-icon-key"></i> </div>) : null}
                        {this.props.moderator.name}
					</h3>
                    {this.props.is_admin && !this.props.moderator.user.is_staff ?
                        (<div className="simple-btn" onClick={this.changeConfirmWindowStatus}><i className="el-icon-minus"></i></div>)
                        : null}
					{this.state.remove_status == 'error' && <p>Совершить операцию удаления не удалось.</p>}
                </li>
            </>
        )
    }
}

export default ModeratorCard
