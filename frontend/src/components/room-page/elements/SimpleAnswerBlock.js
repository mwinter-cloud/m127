import React, { Component } from 'react'
import parse from "html-react-parser"
import {specialtagstohtml, transformationforshow} from "../../common-elements/form/elements/editor/TextEditor"
import axios from "axios"

class SimpleAnswerBlock extends Component {
	constructor(props) {
		super(props)
		this.state = {
			answer: {}
		}
	}

	componentDidMount() {
		axios.get(window.location.origin + '/api/get-answer/' + this.props.id).then(res => {
            this.setState({answer: res.data})
        })
	}

	render() {
		if (this.state.answer.author) {
			return (
				<>
					<h3><i className="el-icon-arrow-right"></i> {this.state.answer.room.name}</h3>
					<div className="answer">
						<div className="author">
							<img src={this.state.answer.author.avatar} className="base-avatar"/>
							<div className="author-info">
										<span
											className={this.state.answer.author.color ? this.state.answer.author.color.type : null}>
											{this.state.answer.author.name}</span>
							</div>
						</div>
						<div className="text">
							<header className="answer-header">
								<div className="btn">{this.state.answer.created_at}</div>
							</header>
							<div
								className="answer-text">{this.state.answer.text ?
								(parse(transformationforshow(specialtagstohtml(this.state.answer.text)))) : null}
							</div>
						</div>
					</div>
					<div className="transparent-btn" onClick={this.props.closeWindow}>
						<a href={"/room/"+this.state.answer.room.id}>Открыть комнату</a>
					</div>
				</>
			)
		} else {
			return null
		}
	}
}

export default SimpleAnswerBlock
