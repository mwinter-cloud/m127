import React, { Component } from 'react'
import {Link} from "react-router-dom"

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sections: [
                {
                    name: "1",
                    title: "Концепция сайта",
                },
                {
                    name: "2",
                    title: "Руководство по использованию",
                },
                {
                    name: "3",
                    title: "Описание кода backend",
                },
                {
                    name: "4",
                    title: "Описание кода frontend",
                },
                {
                    name: "5",
                    title: "Учебные материалы по организации сообщества",
                },
                {
                    name: "6",
                    title: "Учебные материалы для программистов",
                },
            ],
        }
    }

    render() {
        return (
            <aside>
                <ul>
                    {this.state.sections.map((section, index) => {
                        return (
                            <li className="active" data-section={section.name} key={index}>
                                {this.props.active_section==section.name?(<div className="activeline"></div>):""}
                                <Link to={"/admin-panel/guide/"+section.name}>{section.title}</Link>
                            </li>
                        )
                    })}
                </ul>
            </aside>
        )
    }
}

export default Menu
