import React, { Component } from 'react'

class Option extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: "undefined"
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const set_width = (voices, voices_count) => {
            if (nextProps.voices) {
                let width = (voices / voices_count) * 100 + '%'
                this.setState({width: width})
            } else {
                this.setState({width: "undefined"})
            }
        }
        if (this.props.voices != nextProps.voices || this.props.voices_count != nextProps.voices_count) {
            set_width(nextProps.voices, nextProps.voices_count)
        }
    }

    render() {
        if (this.props.voice_sended) {
            return (
                <li data-id={this.props.option.id} data-index={this.props.index} id={"option" + this.props.option.id}>
                    {this.props.option.text} {this.props.selected_option == this.props.option.id ? (<div className="el-icon-check"></div>) : null}
                    <div className="progress"
                         style={this.state.width != "undefined" ? ({width: this.state.width}) : ({width: 0})}>
                    </div> 
                </li>
            )
        } else {
            return (
                <li data-id={this.props.option.id} data-index={this.props.index} id={"option" + this.props.option.id}
                    onClick={this.props.selectOption}
                    className={this.props.selected_option == this.props.option.id ? "selected-option" : null}>
                    {this.props.option.text}
                </li>
            )
        }
    }
}

export default Option
