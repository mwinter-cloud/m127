import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import parse from "html-react-parser"
import {specialtagstohtml, transformationforshow} from "../../../common-elements/form/elements/editor/TextEditor"
import axios from "axios"

class LatestAnswer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			answer: null,
			loading: true
		}
	}

	componentDidMount() {
		axios.get(window.location.origin + '/api/get-latest-answer').then(res => {
			console.log(res)
			if (res.data && res.data.id) {
				this.setState({answer: res.data, loading: false})
			} else {
				this.setState({loading: false})
			}
		}).catch(() => {
			this.setState({loading: false})
		})
	}

	render() {
		if (this.state.loading) {
			return (
				<div className="transparent-btn latest-answer-block">
					<div className="loading-icon"><i className="el-icon-loading"></i></div>
				</div>
			)
		}

		if (!this.state.answer || !this.state.answer.author) {
			return null
		}

		return (
            <div className='last-answer-container'>
                <h3 className='last-answer-container-title'>Новое сообщение</h3>
                <div className="latest-answer-block">
                    <div className="latest-answer-content">
						<div className="latest-answer-header">
							{this.state.answer.author.avatar != null ? (
								<img src={this.state.answer.author.avatar} className="latest-answer-avatar"/>
							) : (
								<div className="latest-answer-avatar base-avatar"></div>
							)}
							<div className="latest-answer-author-info">
								<span> {this.state.answer.author.name}</span>
								<span className="latest-answer-time">{this.state.answer.created_at}</span>
							</div>
						</div>
                        <div className="answer-text-wrapper">
                            <div className="answer-text">
                                {this.state.answer.text ?
                                    (parse(transformationforshow(specialtagstohtml(this.state.answer.text)))) : null}
                            </div>
                        </div>
                    </div>
                    <div className="latest-answer-footer">
                        <Link to={"/room/" + this.state.answer.room.id}>В комнату <i class="el-icon-arrow-right arrow"></i></Link>
                    </div>
                </div>
            </div>
		)
	}
}

export default LatestAnswer
