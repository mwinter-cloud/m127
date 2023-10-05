import React, { Component } from 'react'
import  '../../../../static/frontend/images/small-logo.png'
import './style/agreement.css'
import axios from "axios"
import parse from "html-react-parser"

class AgreementPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            RL: "",
            SD: "",
            CT: "",
            open_description: 0,
            open_contacts: 0,
        }
		this.openDescription = this.openDescription.bind(this)
		this.openContacts = this.openContacts.bind(this)
    }

    componentDidMount() {
        const set_data = (el) => {this.setState(el)}
        axios.get('http://' + window.location.host + '/api/get-site-data').then(res => {
            const data = res.data
            data.map(item => set_data({[item.type]: item.text}))
        })
    }

    openDescription = () => {
		this.setState({open_description: (this.state.open_description ? 0 : 1)})
	}

    openContacts = () => {
		this.setState({open_contacts: (this.state.open_contacts ? 0 : 1)})
	}

    render() {
        if(this.state.RL!="undefined") {
            return (
                <div className="agreement-page">
                    <header className="main-agreement-header">
                        <img src="../../../../static/frontend/images/small-logo.png" className="small-logo"/>
                        <h3 className="citename">Почта ветров</h3>
                        <i className="el-icon-arrow-right"></i>
                        <h3>Соглашение</h3>
                    </header>
                    <main>
                        <h1>Правила</h1>
                        <p className="pale-text">
                            Регистрируясь, участники соглашаются с правилами сообщества.
                        </p>
                        <div className="rules-content">{parse(this.state.RL)}</div>
                        <div className="info-block">
                            <header onClick={this.openDescription}>
                                <h3><i className="el-icon-notebook-2"></i> Описание сообщества</h3>
                            </header>
                            <div className={this.state.open_description?"social-info":"hide"}>
                                <div className="info-block-content">
                                    {parse(this.state.SD)}
                                </div>
                            </div>
                        </div>
                        <div className="info-block">
                            <header onClick={this.openContacts}>
                                <h3><i className="el-icon-chat-line-square"></i> Контактные данные</h3>
                            </header>
                            <div className={this.state.open_contacts?"social-info":"hide"}>
                                <div className="info-block-content">
                                    {parse(this.state.CT)}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            )
        } else { return null }
    }
}

export default AgreementPage
