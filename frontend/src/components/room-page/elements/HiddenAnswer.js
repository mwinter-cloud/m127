import React, { Component } from 'react'
import FullScreenWindow from "../../common-elements/windows/FullScreenWindow"
import Profile from "../../member/profile/Profile"
import MediaQuery from "react-responsive"
import AnswerHeaderBtns_wrap from "../../../store/wraps/room-page/AnswerHeaderBtns"

class HiddenAnswer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile_window: 0,
        }
        //this.openConfirmWindow = this.openConfirmWindow.bind(this)
        this.openProfile = this.openProfile.bind(this)
    }

    openProfile = () => {
        this.setState({profile_window: (this.state.profile_window ? 0 : 1)})
    }

    render() {
        return (
            <>
                {this.state.profile_window ? (
                    <FullScreenWindow
                        children={<Profile id={this.props.answer.author.id}
                                           closeWindow={this.openProfile}/>}/>) : null}
                <div className="answer" id={"answer" + this.props.answer.id}>
                    <MediaQuery maxWidth={800}>
                        <AnswerHeaderBtns_wrap answer={this.props.answer}/>
                    </MediaQuery>
                    <div className="author">
                        {this.props.answer.author.avatar != null ?
                            (<img src={this.props.answer.author.avatar} className="avatar"/>)
                            : null}
                        <div className="author-info"
                             onClick={this.openProfile}>
										<span
                                            className={this.props.answer.author.color ? this.props.answer.author.color.type : null}>
											{this.props.answer.author.name}</span>
                        </div>
                    </div>
                    <div className="text">
                        <MediaQuery minWidth={801}>
                            <AnswerHeaderBtns_wrap answer={this.props.answer}/>
                        </MediaQuery>
                        <div className="answer-text mute-text">Текст сообщения скрыт.</div>
                    </div>
                </div>
            </>
        )
    }
}

export default HiddenAnswer
