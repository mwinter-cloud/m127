import React, {Component} from 'react'
import './style/agreement.css'
import axios from 'axios'
import parse from 'html-react-parser'

class AgreementPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            RL: "",
            SD: "",
            CT: "",
            logo: "",
            description_block_status: 'disabled',
            contacts_block_status: 'disabled',
            citename: ""
        }
		this.changeDescriptionStatus = this.changeDescriptionStatus.bind(this)
		this.changeContactsStatus = this.changeContactsStatus.bind(this)
    }

    componentDidMount() {
        const set_data = (el) => {this.setState(el)}
        axios.get(window.location.origin + '/api/get-site-data').then(({data}) => {
			console.log(data.logo)
			this.setState({logo: data.logo})
            data.info.map(item => {
				set_data({[item.type]: item.text})
			})
        })
        axios.get('/api/get-citename').then(res => {
            const text = res.data.text
            this.setState({citename: text})
        })
    }

    changeDescriptionStatus = () => {
		this.setState({description_block_status: (this.state.description_block_status == 'active' ? 'disabled' : 'active')})
	}

    changeContactsStatus = () => {
		this.setState({contacts_block_status: (this.state.contacts_block_status == 'active' ? 'disabled' : 'active')})
	}

    render() {
        if(this.state.RL != "undefined") {
            return (
                <div className="agreement-page night-mode">
                    <header className="main-agreement-header">
                        <img src={this.state.logo} className="small-logo"/>
                        <h3 className="citename">{this.state.citename?this.state.citename:window.location.hostname}</h3>
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
                            <header onClick={this.changeDescriptionStatus}>
                                <h3><i className="el-icon-notebook-2"></i> Описание сообщества</h3>
                            </header>
                            <div className={this.state.description_block_status == 'active' ?"social-info" : "hide"}>
                                <div className="info-block-content">
                                    {parse(this.state.SD)}
                                </div>
                            </div>
                        </div>
                        <div className="info-block">
                            <header onClick={this.changeContactsStatus}>
                                <h3><i className="el-icon-chat-line-square"></i> Контактные данные</h3>
                            </header>
                            <div className={this.state.contacts_block_status == 'active' ? "social-info" : "hide"}>
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
