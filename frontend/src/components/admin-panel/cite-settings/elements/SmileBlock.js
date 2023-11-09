import React, { Component } from 'react'
import ConfirmWindow from "../../../common-elements/windows/ConfirmWindow"

class SmileBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirm_window: 0,
        }
        this.openConfirmWindow = this.openConfirmWindow.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    openConfirmWindow = () => {
        this.setState({confirm_window: (this.state.confirm_window ? 0 : 1)})
    }

    removeItem = () => {
        const id = this.props.smile.id
        const remove = () => {this.props.removeItem(id)}
        $.ajax({
            type: 'post',
            url: '../api/delete-smile',
            data: {id: id},
            success: function () {
                remove()
            },
            error: function (xhr, status, error) {
                console.log(JSON.parse(xhr.responseText))
            }
        })
        this.openConfirmWindow()
    }

    render() {
        return (
            <>
                {this.state.confirm_window ? (
                    <ConfirmWindow confirm_function={this.removeItem} close={this.openConfirmWindow}/>) : ""}
                <div className="smile-edit-block">
                    <img src={this.props.smile.file} alt={this.props.smile.name}/>
                    <i className="el-icon-delete text-btn" onClick={this.openConfirmWindow}></i>
                </div>
            </>
        )
    }
}

export default SmileBlock
