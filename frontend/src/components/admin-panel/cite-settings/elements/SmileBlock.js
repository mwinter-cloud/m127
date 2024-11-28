import React, {Component} from "react"
import ConfirmWindow from "../../../common-elements/windows/ConfirmWindow"

class SmileBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirm_window_status: 'disabled',
        }
        this.changeConfirmWindowStatus = this.changeConfirmWindowStatus.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    changeConfirmWindowStatus = () => {
        this.setState({confirm_window_status: (this.state.confirm_window_status == 'active' ? 'disabled' : 'active')})
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
        this.changeConfirmWindowStatus()
    }

    render() {
        return (
            <>
                {this.state.confirm_window_status == 'active' && (<ConfirmWindow confirmFunc={this.removeItem} close={this.changeConfirmWindowStatus} />)}
                <div className="smile-edit-block">
                    <img src={this.props.smile.file} alt={this.props.smile.name}/>
                    <i className="el-icon-delete text-btn" onClick={this.changeConfirmWindowStatus}></i>
                </div>
            </>
        )
    }
}

export default SmileBlock
