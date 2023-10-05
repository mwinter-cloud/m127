import React, { Component } from 'react'
import ModeratorCard from "./ModeratorCard"
import remove_array_item from "../../../../../special-functions/remove-array-item"
import axios from "axios"

class ModeratorList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moderators: []
        }
        this.removeItem = this.removeItem.bind(this)
    }

    componentDidMount() {
        axios.get(window.location.origin + '/api/get-moderators').then(res => {
            this.setState({moderators: res.data})
        })
    }

    removeItem = (id) => {
        let new_list = remove_array_item(this.state.moderators, id)
        this.setState({moderators: new_list})
    }

    render() {
        return (
            <div className="moderator-list">
                <div className="moderation-card">
                    <ul className="admin-list">
                        {this.state.moderators.map((moderator, index) => {
                            return (
                                <ModeratorCard moderator={moderator} key={index}
                                               is_admin={this.props.is_admin} removeItem={this.removeItem}/>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default ModeratorList
