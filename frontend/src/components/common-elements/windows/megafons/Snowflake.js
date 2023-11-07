import React, { Component } from 'react'
import "../../../../../static/frontend/images/bubble1.png"
import "../../../../../static/frontend/images/bubble2.png"
import "../../../../../static/frontend/images/blue-flower-smile.png"

class Snowflake extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        setTimeout(function () {
        }, 25000)
    }

    render() {
        let content1 = ""
        let content2 = ""
        let content3 = ""
        if (this.props.type == "summer") {
            content1 = (<img src="../../../../../static/frontend/images/bubble1.png"/>)
            content2 = content1
            content3 = (<img src="../../../../../static/frontend/images/bubble2.png"/>)
        } else if (this.props.type == "colors") {
            content1 = (
                <>
                    <i className={"confetti-item confetti-item-1"}></i>
                    <i className={"confetti-item confetti-item-2"}></i>
                    <i className={"confetti-item confetti-item-3"}></i>
                </>
            )
        } else if (this.props.type == "winter") {
            content1 = "❄"
            content2 = content1
            content3 = content1
        } else if (this.props.type == "fish") {
            const num = Math.floor(Math.random() * 2)+1
            content1 = (<img src="../../../../../static/frontend/images/bubble1.png"/>)
            content2 = (<img src={"../../../../../static/frontend/images/bubble"+num+".png"}/>)
            content3 = (<img src="../../../../../static/frontend/images/bubble2.png"/>)
        } else if (this.props.type == "pink-flower") {
            content1 = "🌸"
            content2 = content1
            content3 = content1
        } else if (this.props.type == "blue-flower") {
            content1 = (<img src="../../../../../static/frontend/images/blue-flower-smile.png"/>)
            content2 = content1
            content3 = content1
        } else if (this.props.type == "cat") {
            content1 = "🍬"
            content2 = "🍭"
            content3 = "🍥"
        }
        return (
            <div className="snowflakes" aria-hidden="true">
                    <div className="snowflake">
                        {content1}
                    </div>
                    <div className="snowflake">
                        {content3}
                    </div>
                    <div className="snowflake">
                        {content2}
                    </div>
                    <div className="snowflake">
                        {content3}
                    </div>
                    <div className="snowflake">
                        {content2}
                    </div>
                    <div className="snowflake">
                        {content3}
                    </div>
                    <div className="snowflake">
                        {content2}
                    </div>
                    <div className="snowflake">
                        {content1}
                    </div>
                    <div className="snowflake">
                        {content2}
                    </div>
                    <div className="snowflake">
                        {content3}
                    </div>
                    <div className="snowflake">
                        {content1}
                    </div>
                    <div className="snowflake">
                        {content3}
                    </div>
            </div>
        )
    }
}

export default Snowflake
