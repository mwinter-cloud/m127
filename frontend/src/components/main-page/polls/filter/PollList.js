import React from 'react'
import {Link} from "react-router-dom"

class PollList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<>
				<div className="list">
					<input placeholder="Поиск" className="tag-search search"
						   onInput={this.props.onPollSearch}/>
					<ul className="themes">
						<div
							className={this.props.section == 2 ? "new-polls-count hide" : "hide"}>
							<span>Показать новые опросы</span>
						</div>
						{this.props.polls.map((poll, index) => {
							return (
								<li key={index} className="poll-list-el" id={"poll_list_el_" + poll.id} onClick={this.props.closeMenu}>
									<Link to={"/poll/" + poll.id}>{poll.question}</Link>
								</li>
							)
						})}
						{this.props.control_poll ? (
							<div className="show-more" onClick={this.props.loadPolls}>Показать больше</div>) : null}
					</ul>
				</div>
			</>
		)
	}
}

export default PollList
