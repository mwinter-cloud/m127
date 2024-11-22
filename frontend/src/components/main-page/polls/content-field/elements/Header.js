import React, {Component} from 'react'
import {Navigate} from "react-router-dom"
import ConfirmWindow from "../../../../common-elements/windows/ConfirmWindow"
import FullScreenWindow from "../../../../common-elements/windows/FullScreenWindow"
import Profile from "../../../../member/profile/Profile"
import axios from "axios"

class Header extends Component {
    constructor(props) {
        super(props)
		this.state = {
			confirmWindow: 'disabled',
            navigation: 'disabled',
            profileWindow: 'disabled',
		}
        this.openConfirmWindow = this.openConfirmWindow.bind(this)
        this.deletePoll = this.deletePoll.bind(this)
		this.openProfile = this.openProfile.bind(this)
    }

    openConfirmWindow = () => {
        this.setState({confirmWindow: (this.state.confirmWindow == 'active' ? 'disabled' : 'active')})
    }

	openProfile = () => {
		this.setState({profileWindow: (this.state.profileWindow == 'active' ? 'disabled' : 'active')})
	}

    deletePoll = () => {
		const formData = new FormData()
		formData.append('csrfmiddlewaretoken', csrftoken)
		formData.append('poll_id', this.props.poll.id)
		axios.post(window.location.origin + '/api/delete-poll', formData)
			.then(({data}) => {
				this.setState({navigation: 'active'})
				document.getElementById(`poll_list_el_${this.props.poll.id}`).classList.add('hide')
				this.setState({saved_loading_status: 'loaded'})
			}).catch((data) => {
				this.setState({saved_loading_status: 'error'})
			})
    }

    render() {
        return (
            <>
                {this.state.navigation == 'active' && (<Navigate to={"../"} />)}
                {this.state.profileWindow == 'active' &&
						<FullScreenWindow
							children={<Profile id={this.props.poll.author.id}
											   closeWindow={this.openProfile}/>}/>}
                {this.state.confirmWindow == 'active' && (<ConfirmWindow confirmFunc={this.deletePoll} close={this.openConfirmWindow}/>)}
                <header className="header">
                    <h3>{this.props.poll.question}</h3>
                    <p className="author" className="question-header-info">
                        Автор: <span className="color-name underline-hover" onClick={this.openProfile}>{this.props.poll.author && this.props.poll.author.name}</span>
                    </p>
                    <p className="question-header-info">
						<span className="color-name underline-hover" onClick={this.props.savePoll}>
								{this.props.saved_loading_status == 'loaded' ? (this.props.saved == 'saved' ? 'Сохранено' : 'В закладки')
									: (this.props.saved_loading_status != 'error' ? 'ㅤ' : 'Ошибка поиска закладки.')}
						</span>
                    </p>
                    {this.props.poll.author && this.props.member.profile.id == this.props.poll.author.id &&
                        <p className="question-header-info"><span className="color-name underline-hover" onClick={this.openConfirmWindow}>Удалить</span></p>}
                </header>
            </>
        )
    }
}

export default Header
