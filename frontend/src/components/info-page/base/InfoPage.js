import React, {Component} from "react"
import "../styles/info-page.css"
import {Header} from "../elements/Header"
import {SpecialRoomList} from "../elements/SpecialRoomList"
import {ToAdmin} from "../elements/ToAdmin"
import {LinkList} from "../elements/LinkList"
import {Cover} from "../elements/Cover"

class InfoPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cover: "",
            invite_image: ""
        }
    }

    componentDidMount() {
        this.props.illustrations.map(el => {
            if (el.type == "AP") {
                this.setState({cover: el.text})
            }
            if (el.type == "IN") {
                this.setState({invite_image: el.text})
            }
        })
    }

    render() {
        return (
            <main className="info-page night-mode">
                <Header/>
                <div className="main-block">
                    <div className="col-1">
                        <Cover cover={this.state.cover}/>
                        <LinkList invite_image={this.state.invite_image}/>
                    </div>
                    <div className="col-2">
                        <SpecialRoomList/>
                        <ToAdmin member={this.props.member}/>
                    </div>
                </div>
            </main>
        )
    }
}

export default InfoPage
