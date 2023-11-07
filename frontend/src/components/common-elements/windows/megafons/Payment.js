import React, { Component } from 'react'
import '../../../../../static/frontend/images/qrCode.png'

class Payment extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main className="megafons-page megafons-page-info payment-page">
                <img src="../../../../../static/frontend/images/qrCode.png" className="qr"/>
                <p>Чтобы отправить донат,
                    воспользуйся кодом либо <a href="https://pay.cloudtips.ru/p/43450953" target="_blank" className="pay-link"><i className="el-icon-coin"></i> ссылкой</a>.</p>
                <div className="btns info-btns">
                    <div className="btn" data-type="create-message" onClick={this.props.setSection}>
                        Сообщение <i className="el-icon-arrow-right"></i>
                    </div>
                </div>
            </main>
        )
    }
}

export default Payment
