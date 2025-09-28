import React, {Component} from 'react'
import axios from "axios"

class RatingBtns extends Component {
    constructor(props) {
        super(props)
        this.state = {
            minus_sended: 0,
            plus_sended: 0,
            rating: 0,
        }
        this.sendPlus = this.sendPlus.bind(this)
        this.sendMinus = this.sendMinus.bind(this)
        this.sendVoice = this.sendVoice.bind(this)
    }

    componentDidMount() {
        this.setState({rating: this.props.rating})
        const plus_sended = localStorage.getItem("plus_update_" + this.props.note_id)
        const minus_sended = localStorage.getItem("minus_update_" + this.props.note_id)
        if(plus_sended != null) {
            this.setState({plus_sended: 1})
        }
        if(minus_sended != null) {
            this.setState({minus_sended: 1})
        }
    }

    sendPlus = () => {
        if(!this.state.plus_sended) {
            this.sendVoice(1)
        }
    }

    sendMinus = () => {
        if(!this.state.minus_sended) {
            this.sendVoice(0)
        }
    }

    sendVoice = (type) => {
        const set_minus = () => {
            if(this.state.plus_sended) {
                this.setState({plus_sended: 0})
                localStorage.removeItem("plus_update_" + this.props.note_id)
                this.setState({rating: this.state.rating - 2})
            } else {
                this.setState({rating: this.state.rating - 1})
            }
            this.setState({minus_sended: 1}, () => {
				localStorage.setItem(("minus_update_" + this.props.note_id), 1)
			})
        }
        const set_plus = () => {
            if(this.state.minus_sended) {
                this.setState({minus_sended: 0})
                localStorage.removeItem("minus_update_" + this.props.note_id)
                this.setState({rating: this.state.rating + 2})
            } else {
                this.setState({rating: this.state.rating + 1})
            }
            this.setState({plus_sended: 1},() => {
				localStorage.setItem(("plus_update_" + this.props.note_id), 1)
			})
        }
		const formData = new FormData()
		formData.append('csrfmiddlewaretoken', csrftoken)
		formData.append('update_id', this.props.note_id)
		formData.append('type', type)
		formData.append('plus_sended', this.state.plus_sended)
		formData.append('minus_sended', this.state.minus_sended)
		axios.post(`${window.location.origin}/api/send-update-grade`, formData).then(({data}) => {
			if(data == 0) {
				set_minus()
			} else {
				set_plus()
			}
		}).catch(() => {
			console.log('Не удалось обновить рейтинг.')
		})
    }

    render() {
        if (this.state.rating != 'undefined') {
            return (
                <div className="rating">
                    <i className={this.state.plus_sended ?
                        "el-icon-arrow-up active-icon" : "el-icon-arrow-up"}
                       onClick={this.sendPlus}></i>
                    <i className={this.state.minus_sended ?
                        "el-icon-arrow-down active-icon" : "el-icon-arrow-down"}
                       onClick={this.sendMinus}></i>
                    <span className="result">{this.state.rating}</span>
                </div>
            )
        } else {
            return (
                <div className="rating"></div>
            )
        }
    }
}

export default RatingBtns
