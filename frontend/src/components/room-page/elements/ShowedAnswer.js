import React from 'react'
import {parseAnswerHtml} from "../../common-elements/form/elements/editor/TextEditor"

class ShowedAnswer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let text = this.props.text ? (parseAnswerHtml(this.props.text)) : '[ ]'
        if (this.props.text) {
            return (
                <div className="showed-msg">{text!="undefined"?text:"[ ]"}</div>
            )
        } else {
            return (<div className="showed-msg">[ ]</div>)
        }
    }
}

export default ShowedAnswer