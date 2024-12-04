import React, {useState} from "react"
import MediaQuery from "react-responsive"
import {FormWindow} from "../../../common-elements/windows/FormWindow"
import CreatePollForm from "../forms/CreatePollForm"

export const CreateFormBtn = ({poll}) => {
	const [createWindow, setCreateWindow] = useState('disabled')

    const openWindow = () => {
      setCreateWindow(createWindow == 'active' ? 'disabled' : 'active')
    }

	return (
		<>
			{createWindow == 'active' && (
				<FormWindow children={<CreatePollForm closeWindow={openWindow} room={poll} />}
					title="Создать опрос"
					closeWindow={openWindow} />)}
				<MediaQuery minWidth={801}>
					<div className="add-btn" onClick={openWindow}>Добавить</div>
				</MediaQuery>
				<MediaQuery maxWidth={800}>
					<div className="add-btn" onClick={openWindow}><i className="el-icon-plus"></i></div>
				</MediaQuery>
		</>
	)
}
