import React, { Component } from 'react'

class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header>
                <h2>
                    <i className="el-icon-picture-outline-round"></i> Оформление
                </h2>
                <ul className="card-menu">
                    <li className={this.props.active_section == "color_and_text" ? "active" : ""}
                        onClick={this.props.setItem} data-section="color_and_text">
                        Цвет и текст
                        {this.props.active_section == "color_and_text" ? (<div className="line"></div>) : ""}
                    </li>
                    <li className={this.props.active_section == "illustrations" ? "active" : ""}
                        onClick={this.props.setItem} data-section="illustrations">Иллюстрации
                        {this.props.active_section == "illustrations" ? (<div className="line"></div>) : ""}
                    </li>
                </ul>
            </header>
        )
    }
}

export default Header
