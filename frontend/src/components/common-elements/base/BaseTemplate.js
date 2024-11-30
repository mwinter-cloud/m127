import React, {Component} from "react"
import {Outlet} from "react-router-dom"
import Header from "../../common-elements/base/header/Header"

class BaseTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: localStorage.getItem('mode'),
        }
		this.changeMode = this.changeMode.bind(this)
    }
	
	componentDidMount() {
		if(!localStorage.getItem('mode')) {
			localStorage.setItem("mode", "night")
		}
		const catchNewMode = () => {
			this.setState({'mode': localStorage.getItem('mode')})
		}
		window.addEventListener('storage', catchNewMode)
	}
	
	changeMode() {
		let new_mode = localStorage.getItem('mode') == 'day' ? 'night' : 'day'
		localStorage.setItem("mode", new_mode)
		this.setState({'mode': new_mode})
	}

    render() {
        return (
            <div className={this.state.mode + "-mode"}>
                <Header changeMode={this.changeMode} />
                <Outlet/>
            </div>
        )
    }
}

export default BaseTemplate
