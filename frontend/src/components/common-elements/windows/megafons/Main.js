import React, { Component } from 'react'
import '../../../../../static/frontend/images/fox-and-butterfly.png'

class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main className="megafons-page">
                <div className="col-first">
                    <img src="../../../../../static/frontend/images/fox-and-butterfly.png"
                         className="illustration"/>
                </div>
                <div className="col-two">
                    <h2>Сообщи о чем-то особенном!</h2>
                    <span className="mf-text">Ты можешь поблагодарить разработчика и поддержать его донатом. Отправив донат, создай сообщение, которое будет заметно на всем форуме. Впрочем, ты можешь воспользоваться мегафоном и просто так.</span>
                    <div className="btns">
                        <div className="btn" data-type="payment" onClick={this.props.setSection}>Вперед!</div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Main
