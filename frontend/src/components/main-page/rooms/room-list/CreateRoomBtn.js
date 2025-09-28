import React, {useState} from "react"
import MediaQuery from "react-responsive"
import {FormWindow} from "../../../common-elements/windows/FormWindow"
import CreateRoomForm from "../../forms/CreateRoomForm"

const CreateRoomBtn = () => {
	const [createWindow, setCreateWindow] = useState('close')

	const upCreateWindow = () => {
		setCreateWindow(createWindow == 'close' ? 'open' : 'close')
	}

	return (
		<>
			{createWindow == 'open' && <FormWindow children={<CreateRoomForm />} title="Создать комнату"
				closeWindow={upCreateWindow} />}
			<MediaQuery maxWidth={800}>
				<div className="add-btn" onClick={upCreateWindow}><i className="el-icon-plus"></i></div>
			</MediaQuery>
			<MediaQuery minWidth={801}>
				<button className="special-btn" onClick={upCreateWindow}><span>Добавить</span></button>
			</MediaQuery>
		</>
	)
}

export default CreateRoomBtn
