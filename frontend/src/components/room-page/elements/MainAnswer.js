import React, {useState} from 'react'
import parse from "html-react-parser"
import {specialtagstohtml, transformationforshow} from "../../common-elements/form/elements/editor/TextEditor"
import MediaQuery from 'react-responsive'
import FullScreenWindow from "../../common-elements/windows/FullScreenWindow"
import Profile from "../../member/profile/Profile"

const MainAnswer = ({answer}) => {
    const [profileWindow, setProfileWindow] = useState('closed')

    const upProfile = () => {
        setProfileWindow(profileWindow == 'opened' ? 'closed' : 'opened')
    }

	return (
		<>
			{profileWindow == 'opened' && <FullScreenWindow children={<Profile id={answer.author.id} closeWindow={upProfile}/>} />}
			<div className="answers first-answer">
				<div className="answer">
					<MediaQuery maxWidth={800}>
						<header className="answer-header">
							<div className="btn">{answer.created_at}</div>
						</header>
					</MediaQuery>
					<div className="author">
						{answer.author.avatar != null ? (<img src={answer.author.avatar} className="avatar"/>) : (<div className="avatar base-avatar"></div>)}
						<div className="author-info" onClick={upProfile}>
							<span className={answer.author.color}>{answer.author.name}</span>
						</div>
					</div>
					<div className="text">
						<MediaQuery minWidth={801}>
							<header className="answer-header">
								<div className="btn">{answer.created_at}</div>
							</header>
						</MediaQuery>
						<div
							className="answer-text">
							{parse(transformationforshow(specialtagstohtml(answer.text)))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default MainAnswer
