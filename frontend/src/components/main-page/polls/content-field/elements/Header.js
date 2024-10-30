import React, { Component } from 'react'
import {Navigate} from "react-router-dom"
import ConfirmWindow from "../../../../common-elements/windows/ConfirmWindow"
import FullScreenWindow from "../../../../common-elements/windows/FullScreenWindow"
import Profile from "../../../../member/profile/Profile"

class Header extends Component {
    constructor(props) {
        super(props)
		this.state = {
			confirm_window: 0,
            navigation: 0,
            profile_window: 0,
		}
        this.openConfirmWindow = this.openConfirmWindow.bind(this)
        this.deletePoll = this.deletePoll.bind(this)
		this.openProfile = this.openProfile.bind(this)
    }

    openConfirmWindow = () => {
        this.setState({confirm_window:(this.state.confirm_window?0:1)})
    }

	openProfile = () => {
		this.setState({profile_window: (this.state.profile_window ? 0 : 1)})
	}

    deletePoll = () => {
        const poll_id = this.props.poll.id
        const set_nav = () => {this.setState({navigation: 1})}
        const delete_list_item = () => {
            document.getElementById("poll_list_el_"+poll_id).classList.add('hide')
        }
        $.ajax({
                type: 'post',
                url: '/api/delete-poll',
                cache: false,
                data: {poll_id: poll_id},
                success: function () {
                    set_nav()
                    delete_list_item()
                },
                error: function () {
                    console.log('При удалении опроса возникла ошибка. Попробуй позже.')
                }
            })
    }

    render() {
        return (
            <>
                {this.state.navigation?(<Navigate to={"../"} />):null}
                {this.state.profile_window ? (
						<FullScreenWindow
							children={<Profile id={this.props.poll.author.id}
											   closeWindow={this.openProfile}/>}/>) : null}
                {this.state.confirm_window?(<ConfirmWindow confirm_function={this.deletePoll} close={this.openConfirmWindow}/>):null}
                <header className="header">
                    <h3>{this.props.poll.question}</h3>
                    <p className="author" className="question-header-info">
                        Автор: <span className="color-name underline-hover" onClick={this.openProfile}>{this.props.poll.author.name}</span>
                    </p>
                    <p className="question-header-info">
                    <span className="color-name underline-hover"
                          onClick={this.props.savePoll}>{this.props.saved == 1 ? 'Сохранено' : 'В закладки'}</span>
                    </p>
                    {this.props.member.profile.id == this.props.poll.author.id ?
                        (<p className="question-header-info"><span className="color-name underline-hover" onClick={this.openConfirmWindow}>Удалить</span></p>)
                        : null}
                </header>
            </>
        )
    }
}

export default Header
