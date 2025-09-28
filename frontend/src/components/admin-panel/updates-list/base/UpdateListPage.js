import React, {Component} from "react"
import {Header} from "../elements/Header"
import UpdateList from "../elements/UpdateList"

class UpdateListPage extends Component {
	constructor(props) {
		super(props)
    }

    componentDidMount() {
		this.props.set_menu_item('updates')
    }

    render() {
		return (
			<main className="big-container updates-section">
				<Header />
			    <UpdateList member={this.props.member} />
			</main>
		)
    }
}

export default UpdateListPage
