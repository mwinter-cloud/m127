import React, { Component } from 'react'
import parse from "html-react-parser"
import {specialtagstohtml, transformationforshow} from "../../common-elements/form/elements/editor/TextEditor"
import MediaQuery from 'react-responsive'
import FullScreenWindow from "../../common-elements/windows/FullScreenWindow";
import Profile from "../../member/profile/Profile";

class MainAnswer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile_window: 0,
        }
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
                <div className="answers first-answer">
                    <div className="answer">
                        <MediaQuery maxWidth={800}>
                            <header className="answer-header">
                                <div className="btn">{this.props.answer.created_at}</div>
                            </header>
                        </MediaQuery>
                        <div className="author">
                            {this.props.answer.author.avatar ?
                                (<img src={this.props.answer.author.avatar} className="base-avatar"/>) : null}
                            <div className="author-info" onClick={this.openProfile}>
                                <span className={this.props.answer.author.color}>{this.props.answer.author.name}</span>
                            </div>
                        </div>
                        <div className="text">
                            <MediaQuery minWidth={801}>
                                <header className="answer-header">
                                    <div className="btn">{this.props.answer.created_at}</div>
                                </header>
                            </MediaQuery>
                            <div
                                className="answer-text">
                                {parse(transformationforshow(specialtagstohtml(this.props.answer.text)))}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default MainAnswer
