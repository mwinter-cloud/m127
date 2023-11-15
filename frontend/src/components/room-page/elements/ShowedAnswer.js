import React from 'react'
import parse from "html-react-parser"
import {specialtagstohtml, transformationforshow} from "../../common-elements/form/elements/editor/TextEditor"

class ShowedAnswer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let text = this.props.text ? (parse(String(transformationforshow(specialtagstohtml(this.props.text))))) : '[ ]'
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