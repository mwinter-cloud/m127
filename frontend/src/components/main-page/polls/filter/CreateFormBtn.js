import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import FormWindow from "../../../common-elements/windows/FormWindow";
import CreatePollForm from "../forms/CreatePollForm";

class CreateFormBtn extends Component {
    constructor(props) {
        super(props)
		this.state = {
			create_window: 0,
		}
        this.openWindow = this.openWindow.bind(this)
    }

    openWindow = () => {
        this.setState({create_window: this.state.create_window ? 0 : 1})
    }

    render() {
        return (
            <>
				{this.state.create_window ? (
                    <FormWindow children={<CreatePollForm reloadRoom={this.reloadPoll} closeWindow={this.openWindow} room={this.props.poll}/>}
                                title="Создать опрос"
                                closeWindow={this.openWindow}/>) : ""}
                    <MediaQuery minWidth={801}>
						<div className="add-btn" onClick={this.openWindow}>Добавить</div>
					</MediaQuery>
                    <MediaQuery maxWidth={800}>
						<div className="add-btn" onClick={this.openWindow}><i className="el-icon-plus"></i></div>
					</MediaQuery>
            </>
        )
    }
}

export default CreateFormBtn
