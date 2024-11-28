import React from 'react'
import {Link} from "react-router-dom"

export const PollList = ({control_poll, loadPolls, onPollSearch, section, polls, changeMenuStatus}) => {
	return (
		<div className="list">
			<input placeholder="Поиск" className="tag-search search" onInput={onPollSearch} />
			<ul className="themes">
				<div className={section == 2 ? "new-polls-count hide" : "hide"}>
					<span>Показать новые опросы</span>
				</div>
				{polls?.map((poll, index) => {
					return (
						<li key={index} className="poll-list-el" id={`poll_list_el_${poll.id}`} onClick={changeMenuStatus}>
							<Link to={"/poll/" + poll.id}>{poll.question}</Link>
						</li>
					)
				})}
				{control_poll !== 0 && (<div className="show-more" onClick={loadPolls}>Показать больше</div>)}
			</ul>
		</div>
	)
}