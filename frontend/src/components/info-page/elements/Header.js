import React, { Component } from 'react'
import {Link} from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hello: ""
        }
    }

    componentDidMount(){
	    let MyDate = new Date
        let MyHours = MyDate.getHours()
        let name = ''
        switch (true){
        	case (MyHours >= 5) && (MyHours < 11):name = 'Доброе утро'
        	break
        	case (MyHours >= 11) && (MyHours < 16):name = 'Добрый день'
        	break
        	case (MyHours >= 16) && (MyHours <= 23):name = 'Добрый вечер'
        	break
        	case (MyHours >= 0) && (MyHours < 5):name = 'Доброй ночи'
        	break
        	default:name = 'Здравствуй'
        	break
        }
		this.setState({
			hello: name
		})
	}

    render() {
        return (
            <header className="header">
                <Link to="../"><i className="el-icon-back arrow-back"></i></Link>
                <h1>{this.state.hello}!</h1>
            </header>
        )
    }
}

export default Header
