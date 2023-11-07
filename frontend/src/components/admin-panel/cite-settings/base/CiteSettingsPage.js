import React, { Component } from 'react'
import ColorAndTextForm from "../forms/ColorAndTextForm"
import Header from "../elements/Header"
import IllustrationsForm from "../forms/IllustrationsForm"
import axios from "axios"
import SmilesSettings from "../elements/SmilesSettings"

class CiteSettingsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AN: "",
            CN: "",
            RL: "",
            SD: "",
            CT: "",
        }
        this.setItem = this.setItem.bind(this)
    }

    componentDidMount() {
        this.props.set_menu_item('cite-settings')
        const set_settings = (el) => {
            this.setState(el)
        }
        axios.get(window.location.origin + '/api/get-customization-settings').then(res => {
            const settings = res.data
            settings.map(item => set_settings({[item.type]: item.text}))
        })
    }

    setItem = (e) => {
        let section = e.target.getAttribute('data-section')
        this.props.set_form_section(section)
    }

    render() {
        return (
            <main>
                <div className="cite-settings-banner"></div>
                <div className="settings-container">
                    <div className="moderation-card">
                        <Header setItem={this.setItem} active_section={this.props.cite_settings_section}/>
                        {this.props.cite_settings_section == "color_and_text" ?
                            (<ColorAndTextForm set_colors={this.props.set_colors} colors={this.props.colors}
                                               AN={this.state.AN}
                                               RL={this.state.RL} SD={this.state.SD} CT={this.state.CT}/>) :
                            (<IllustrationsForm set_illustrations={this.props.set_illustrations}
                                                illustrations={this.props.illustrations}/>)}
                    </div>
                    <SmilesSettings/>
                </div>
            </main>
        )
    }
}

export default CiteSettingsPage
