import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import FormWindow from "../../../common-elements/windows/FormWindow"
import CreateRoomForm from "../../forms/CreateRoomForm"

class CreateRoomBtn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			create_window: 0,
		}
		this.openCreateWindow = this.openCreateWindow.bind(this)
	}

	openCreateWindow = () => {
		this.setState({create_window: this.state.create_window ? 0 : 1})
	}

	render() {
		return (
			<>
				{this.state.create_window ? (
					<FormWindow children={<CreateRoomForm/>} title="Создать комнату"
								closeWindow={this.openCreateWindow}/>) : ""}
				<MediaQuery maxWidth={800}>
					<div className="add-btn" onClick={this.openCreateWindow}><i className="el-icon-plus"></i></div>
				</MediaQuery>
				<MediaQuery minWidth={801}>
					<div className="add-btn" onClick={this.openCreateWindow}>Добавить</div>
				</MediaQuery>
			</>
		)
	}
}

export default CreateRoomBtn
