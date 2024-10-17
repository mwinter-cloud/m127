import React, { Component } from 'react'

class PollFooter extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <footer>
                    {this.props.voice_sended ? (<p onClick={this.props.deleteVoice} className="revoice">Переголосовать</p>):
                        (<button className="send-btn" onClick={this.props.sendVoice}>Ответить</button>)}
                    <p>Голосов отправлено: {this.props.voices_count}</p>
                </footer>
                <div className="to-comments hide" onClick={this.props.setComments}><i className="el-icon-chat-round"></i> комментарии</div>
            </>
        )
    }
}

export default PollFooter
