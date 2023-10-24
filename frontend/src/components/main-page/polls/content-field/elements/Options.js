import React, { Component } from 'react'
import Option from "./Option";

class Options extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="poll-options">
                <ul className={this.props.voice_sended?"sended-voice-poll":"empty-poll"}>
                    {this.props.options.map((option, index) => {
                        return (
                            <Option index={index} key={index}
                                    option={option}
                                    selectOption={this.props.selectOption}
                                    voices_count={this.props.voices_count}
                                    voices={this.props.voices[index]}
                                    selected_option={this.props.selected_option}
                                    voice_sended={this.props.voice_sended}/>
                        )
                    })
                    }
                </ul>
            </div>
        )
    }
}

export default Options
