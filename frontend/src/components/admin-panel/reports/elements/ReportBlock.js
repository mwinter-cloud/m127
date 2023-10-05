import React, { Component } from 'react'
import FullScreenWindow from "../../../common-elements/windows/FullScreenWindow"
import Profile from "../../../member/profile/Profile"
import SmallWindow from "../../../common-elements/windows/SmallWindow"
import SimpleAnswerBlock from "../../../room-page/elements/SimpleAnswerBlock"
import WarningButton from "../../../room-page/elements/WarningButton"
import BlockButton from "./BlockButton";

class ReportBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile_window: 0,
            message_window: 0,
            exist_warning: 1,
            ability_to_block: 0,
        }
        this.openProfile = this.openProfile.bind(this)
        this.setMessageWindow = this.setMessageWindow.bind(this)
    }

    openProfile = (e) => {
        const profile_id = e.target.getAttribute('data-id')
        this.setState({profile_window: (this.state.profile_window ? 0 : profile_id)})
    }

    setMessageWindow = () => {
        this.setState({message_window: (this.state.message_window ? 0 : 1)})
    }

    render() {
        return (
            <>
                {this.state.profile_window ? (
                    <FullScreenWindow
                        children={<Profile id={this.state.profile_window}
                                           closeWindow={this.openProfile}/>}/>) : null}
                {this.state.message_window ? (
                        this.props.report.type == 1 ?
                            (<SmallWindow closeWindow={this.setMessageWindow}
                                          children={<SimpleAnswerBlock id={this.props.report.object}/>}
                                          title="Сообщение"/>) : null)
                    : null
                }
                <div className="report">
                        <p><span className="blue underline-hover"
                              onClick={this.openProfile} data-id={this.props.report.sender.id}>
                            {this.props.report.sender.name}</span> пожаловался на <span
                        className="blue underline-hover"
                              onClick={this.openProfile} data-id={this.props.report.violator.id}>
                        {this.props.report.violator.name}</span> {this.props.report.type==1?
                            ("сообщение в комнате"):("опрос")}</p>
                    <div className="btns">
                        <div className="text-btn" onClick={this.setMessageWindow}>Посмотреть запись</div>
                        <WarningButton
                            recipient_user_id={this.props.report.violator.id}
                            recipient_profile_id={this.props.report.violator.id}
                            answer_id={this.props.report.object}
							my_profile={this.props.member.profile}/>
                        <BlockButton
                            violator_user_id={this.props.report.violator.user?this.props.report.violator.user.id:null}
                            violator_profile_id={this.props.report.violator.id}
                            answer_id={this.props.report.object}
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default ReportBlock
