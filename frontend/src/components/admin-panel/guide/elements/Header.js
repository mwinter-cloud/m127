import React, { Component } from 'react'
import SearchBlock from "./SearchBlock"

class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header className="guide-header">
                <h2>Добро пожаловать в руководство по сайту Почта ветров!</h2>
                <SearchBlock search={this.props.search}/>
            </header>
        )
    }
}

export default Header
