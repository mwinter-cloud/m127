import React, { Component } from 'react'
import Colorline from "./Colorline"
import MainHeader_wrap from "../../../../store/wraps/base/MainHeader_wrap"
import MobileMainHeader_wrap from "../../../../store/wraps/base/MobileMainHeader_wrap"
import MediaQuery from 'react-responsive'
import MegafonMessage from "../../windows/megafons/MegafonMessage"

class MainHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            megafon_message: undefined,
        }
    }

    componentDidMount() {
        const set_message = (data) => {
            const set_data = (data) => {
                this.setState({megafon_message: data})
            }
            if (this.state.megafon_message == undefined) {
                set_data(data)
                setTimeout(function () {
                    set_data(undefined)
                }, 25000)
            } else { //вдруг сейчас уже отправлено какое-то сообщение
                setTimeout(function () {
                    set_message(data)
                }, 25000)
            }
        }
        let wsProtocol = ""
        if (window.location.protocol == 'https:') {
          wsProtocol = 'wss://'
        } else {wsProtocol = 'ws://'}
        window.commonSocket = new WebSocket(
            wsProtocol + window.location.host + '/ws/common-channel')
        commonSocket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            set_message(data)
        }
    }

    render() {
        return (
            <>
                {this.state.megafon_message?(<MegafonMessage message={this.state.megafon_message}/>):null}
                <Colorline/>
    		    <MediaQuery maxWidth={800}>
    			    <MobileMainHeader_wrap/>
    			</MediaQuery>
    		    <MediaQuery minWidth={801}>
                    <MainHeader_wrap/>
    			</MediaQuery>
            </>
        )
    }
}

export default MainHeader
