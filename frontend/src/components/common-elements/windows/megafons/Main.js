import React, {Component} from 'react'
import '../../../../../static/frontend/images/megafon-illustration.jpg'

class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main className="megafons-page">
                <div className="col-first">
                    <img src="../../../../../static/frontend/images/megafon-illustration.jpg"
                         className="illustration"/>
                </div>
                <div className="col-two">
                    <h2>Сообщение в общий канал</h2>
                    <span className="mf-text">В этом разделе ты можешь создать сообщение, которое высветится на всем форуме.</span>
                    <div className="btns">
                        <div className="btn" data-type="create-message" onClick={this.props.setSection}>Вперед!</div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Main
