import React, { Component } from 'react'

class Options extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="poll-options">
                {(() => {
                    if (this.props.voice_sended) {
                        return (
                            <ul className="sended-voice-poll">
                                {this.props.options.map((option, index) => {
                                    return (
                                        <li key={index} data-id={option.id} data-index={index} id={"option" + option.id}
                                            className={this.props.selected_option == option.id ? "selected-option" : null}>
                                            {option.text}
                                            {this.props.voice_sended ? (
                                                <div className="progress"
                                                     style={this.props.voices_count ? ({
                                                         width: (this.props.voices[index] / this.props.voices_count) * 100 + '%'
                                                     }) : null}>
                                                </div>) : null}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        )
                    } else {
                        return (
                            <ul>
                                {this.props.options.map((option, index) => {
                                    return (
                                        <li key={index} data-id={option.id} data-index={index} id={"option" + option.id}
                                            onClick={this.props.selectOption} className={this.props.selected_option == option.id ? "selected-option" : null}>
                                            {option.text}
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        )
                    }
                })()}
            </div>
        )
    }
}

export default Options
