import React, { Component } from 'react'
import axios from "axios"
import '../../styles/polls.css'
import PollContentField_wrap from "../../../../store/wraps/base/PollContentField_wrap"
import MediaQuery from 'react-responsive'

export default class PollsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            poll: {},
			pollLoadingStatus: "undefined",
        }
        this.loadPoll = this.loadPoll.bind(this)
    }

    componentDidMount() {
        this.props.setSection('polls')
        this.loadPoll(this.props.id)
        window.scrollTo(0,0)
        axios.get(window.location.origin + '/api/set-poll-view/' + this.props.id)
    }
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.id != this.props.id) {
			this.loadPoll(nextProps.id)
		}
	}

    loadPoll = (id) => {
		const get_poll = axios.get(window.location.origin + '/api/get-poll/' + id, {
			onDownloadProgress: () => {
				this.setState({pollLoadingStatus: 'loading'})
			}
		}).catch(() => {
			this.setState({pollLoadingStatus: 'error'})
		})
        get_poll.then(({data}) => {
            this.setState({poll: data})
			this.setState({pollLoadingStatus: 'loaded'})
        })
    }

    render() {
		return (
			<main className="col2">
                {(() => {
					if(this.state.pollLoadingStatus == 'loaded') {
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
							return <PollContentField_wrap poll={this.state.poll} />
						}
					} else if(this.state.pollLoadingStatus == 'error') {
						return <p>Не удалось получить опрос.</p>
					} else {
						return (
							<div className="loading-icon"><i className="el-icon-loading"></i></div>
						)			
					}
                })()}
			</main>
		)
    }
}
