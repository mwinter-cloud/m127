import React, { Component } from 'react'
import MainAnswer from "../../room-page/elements/MainAnswer"
import axios from "axios"
import { Link } from "react-router-dom"
import "../../room-page/styles/room.css"

class AnswerPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            answer: null,
            loadingStatus: 'loading',
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        axios.get(window.location.origin + '/api/get-answer/' + this.props.id)
            .then(res => {
                const answer = res.data
                this.setState({
                    answer: answer,
                    loadingStatus: 'loaded'
                })
            })
            .catch(() => {
                this.setState({loadingStatus: 'error'})
            })
    }

    render() {
        if (this.state.loadingStatus === "loaded" && this.state.answer) {
            return (
                <main className="room-page">
                    <div className="answer-page-container">
                        {this.state.answer.room && (
                            <div className="answer-page-room-link">
                                <Link to={`/room/${this.state.answer.room.id}`}>
                                    <i className="el-icon-arrow-left"></i> Вернуться к теме: {this.state.answer.room.name}
                                </Link>
                            </div>
                        )}
                        <MainAnswer
                            answer={{
                                id: this.state.answer.id,
                                text: this.state.answer.text,
                                created_at: this.state.answer.created_at,
                                number: this.state.answer.number,
                                author: {
                                    id: this.state.answer.author.id,
                                    name: this.state.answer.author.name,
                                    avatar: this.state.answer.author.avatar,
                                    color: this.state.answer.author.color ? this.state.answer.author.color.type : null,
                                }
                            }}
                        />
                    </div>
                </main>
            )
        } else if (this.state.loadingStatus === "error") {
            return (
                <main className="room-page">
                    <h2 className="not-found-title">Ответ не найден.</h2>
                </main>
            )
        } else {
            return (
                <main className="room-page">
                    <div className="loading-icon"><i className="el-icon-loading"></i></div>
                </main>
            )
        }
    }
}

export default AnswerPage
