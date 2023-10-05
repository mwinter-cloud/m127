import React, { Component } from 'react'

class AddedModeratorCard extends Component {
    constructor(props) {
        super(props)
        this.removeModerator = this.removeModerator.bind(this)
    }

    removeModerator = () => {
        this.props.removeModerator(this.props.moderator.id)
    }

    render() {
        return (
            <div className="added-moderator-card">
                <div className="member-card">
                    <img src={this.props.moderator.avatar} className="avatar"/>
                    <h3>{this.props.moderator.name}</h3>
                </div>
                <div className="btns">
                    <span className="text-btn">Выполнено!</span>
                    <span className="text-btn cancel" onClick={this.removeModerator}>отмена</span>
                </div>
            </div>
        )
    }
}

export default AddedModeratorCard
