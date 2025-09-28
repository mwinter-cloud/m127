import React, { Component } from 'react'
import Links from "./Links";
import AddModeratorBtn from "./AddModeratorBtn"
import AddModeratorForm from "../../forms/AddModeratorForm"

class Aside extends Component {
    constructor(props) {
        super(props)
        this.state = {
            add_form_active: 0,
        }
        this.showForm = this.showForm.bind(this)
    }

    showForm = () => {
        this.setState({add_form_active: (this.state.add_form_active ? 0 : 1)})
    }

    render() {
        return (
            <aside>
                <h2>Модераторы</h2>
                <Links/>
                {this.props.is_admin ? (this.state.add_form_active == 1 ? (<AddModeratorForm/>) : (
                    <AddModeratorBtn showForm={this.showForm}/>)) : null}
            </aside>
        )
    }
}

export default Aside
