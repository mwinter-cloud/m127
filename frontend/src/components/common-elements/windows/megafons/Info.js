import React, { Component } from 'react'
import {Link} from "react-router-dom"
import '../../../../../static/frontend/images/mf-screen.png'

class Info extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main className="megafons-page megafons-page-info">
                <p>Мегафоны - специальный инструмент создания сообщений. Их видят все пользователи,
                находящиеся на сайте в момент отправки на всех страницах, кроме информационной и админ-панели.
                Сообщение представляет из себя стилизованный блок с текстом в формате бегущей строки
                и специальный визуальный эффект, распространяемый по всему экрану.</p>
                <img src="../../../../../static/frontend/images/mf-screen.png" className="mf-illustration"/>
                <p>Используйте данный инструмент только когда считаете свое послание достаточно важным, чтобы
                все его прочитали. Впрочем, не стесняйтесь делать это!</p>
                <div className="btns info-btns">
                    <div className="btn" data-type="main" onClick={this.props.setSection}>Понятно</div>
                    <div className="btn"><Link to={window.location.origin+'/room/8'}>Есть вопрос</Link></div>
                </div>
            </main>
        )
    }
}

export default Info
