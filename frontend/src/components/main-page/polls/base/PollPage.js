import React, { Component } from 'react'
import axios from "axios"
import '../../styles/polls.css'
import PollCommentsField from "../comments/PollCommentsField"
import PollContentField_wrap from "../../../../store/wraps/base/PollContentField_wrap"
import MediaQuery from 'react-responsive'

class PollPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            section: "question",
            poll: {},
            error: "",
        }
        this.loadPoll = this.loadPoll.bind(this)
        this.changeSection = this.changeSection.bind(this)
    }

    componentDidMount() {
        this.props.set_section('polls')
        this.loadPoll(this.props.id)
        window.scrollTo(0,0)
        axios.get(window.location.origin + '/api/set-poll-view/' + this.props.id)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.id != this.props.id) {
            this.loadPoll(nextProps.id)
            if(this.state.section=="comments"){
                this.setState({section: "question"})
            }
        }
    }

    loadPoll = (id) => {
        let set_error = (text) => {
            this.setState({error: text})
        }
        set_error('')
        let get_poll_pr = axios.get('/api/get-poll/' + id).catch(function (error) {
            set_error('Опрос не найден')
            return Promise.reject(error)
        })
        get_poll_pr.then((res) => {
            let poll = res.data
            this.setState({poll: poll})
        })
    }

    changeSection = () => {
        this.setState({section: this.state.section=="question"?"comments":"question"})
    }

    render() {
        return (
            <>
                <div className="col2">
                    {(() => {
                        if (this.props.id == undefined) {
                            return (
                                <>
                                    <MediaQuery maxWidth={800}>
                                        <i className="el-icon-arrow-up null-poll-icon"></i>
                                    </MediaQuery>
                                    <MediaQuery minWidth={801}>
                                        <i className="el-icon-arrow-left null-poll-icon"></i>
                                    </MediaQuery>
                                </>
                            )
                        } else {
                            if (this.state.error == "") {
                                return (
                                    <>{this.state.section == 'comments' ?
                                        (<PollCommentsField poll={this.state.poll} setQuestion={this.changeSection}/>)
                                        : null}
                                        <PollContentField_wrap section={this.state.section} poll={this.state.poll} setComments={this.changeSection}/>
                                    </>
                                )
                            } else {
                                return (<p>{this.state.error}</p>)
                            }
                        }
                    })()}
                </div>
            </>
        )
    }
}

export default PollPage
