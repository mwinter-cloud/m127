import React, { Component } from 'react'
import NewAnswers from "./NewAnswers"
import AnswerBlock from "./AnswerBlock"

class Answers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            answers: [],
            loaded_answers_count: 0,
            new_answers: [],
            section: 1, //1-сначала старые, 2-сначала новые
        }
        this.changeSection = this.changeSection.bind(this)
        this.loadAnswers = this.loadAnswers.bind(this)
    }

    componentDidMount() {
        this.loadAnswers()
    }

    loadAnswers = () => {
        let section = this.state.section
        let id = this.props.id
        let loaded_answers_count = this.state.loaded_answers_count
        let data = {id: id, loaded_answers_count: loaded_answers_count, section: section}
        let set_answers = (data) => {
            if (loaded_answers_count == 0) {
                this.setState({answers: data})
            } else {
                this.setState({
                    answers: this.state.answers.concat(data)
                })
            }
        }
        let set_control_answer = (data) => {
            this.setState({
                control_answer: data
            })
        }
        let set_answers_count = () => {
            this.setState({
                loaded_answers_count: loaded_answers_count + 10
            })
        }
        $.ajax({
            type: 'post',
            url: '/api/get-answers',
            cache: false,
            data: data,
            success: function (res) {
                set_answers(res.answers)
                set_control_answer(res.control_answer)
                set_answers_count()
            },
            error: function (xhr) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
    }

    changeSection = () => {
        if (this.state.section == 1) {
            this.setState({section: 2}, () => {
                this.setState({loaded_answers_count: 0}, () => {
                    this.props.clearNewAnswers()
                    this.loadAnswers()
                })
            })
        } else if (this.state.section == 2) {
            this.setState({section: 1}, () => {
                this.setState({loaded_answers_count: 0}, () => {
                    this.props.clearNewAnswers()
                    this.loadAnswers()
                })
            })
        }
    }

    render() {
        return (
            <div className="answers" id="answer_list">
                <header className="answers-header">
                    <div className="filter" onClick={this.changeSection}>
                        <span id="active_section" data-section={this.state.section}>
                        {this.state.section == 1 ? "сначала старые" : "сначала новые"}
                            <i className="el-icon-arrow-down"></i>
                        </span>
                    </div>
                    <h3>Ответы</h3>
                </header>
                    {this.state.section == 2 ? (<NewAnswers answers={this.props.new_answers}/>) : ""}
                <div className="main-answers">
                    {this.state.answers.map((answer, index) => {
                        return (
                            <AnswerBlock room_id={this.props.id} answer={answer} key={index}/>
                        )
                    })}
                    {this.state.control_answer ? (
                        <div className="right-align">
                            <div className="show-more" onClick={this.loadAnswers}>Показать больше записей</div>
                        </div>) : null}
                </div>
                    {this.state.section == 1 ? (<NewAnswers answers={this.props.new_answers}/>) : ""}
            </div>
        )
    }
}

export default Answers
