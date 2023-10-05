import React, { Component } from 'react'

class AddModeratorBtn extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="add-moderator-btn" onClick={this.props.showForm}>
                <i className="el-icon-plus"></i> Добавить модератора
            </div>
        )
    }
}

export default AddModeratorBtn
