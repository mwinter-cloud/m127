import React, { Component } from 'react'

class IllustrationInputWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            label: ""
        }
    }

    componentDidMount() {
        switch (this.props.name) {
            case 'L':
                this.setState({label: "Лого"})
                break
            case 'IN':
                this.setState({label: "Приглашение"})
                break
            case 'DA':
                this.setState({label: "Базовый аватар"})
                break
            case 'DC':
                this.setState({label: "Базовая обложка"})
                break
            case 'EP':
                this.setState({label: "Иллюстрация на странице с ошибкой"})
                break
            case 'AP':
                this.setState({label: "Иллюстрация инфо-страницы"})
                break
            case 'GC':
                this.setState({label: "Иллюстрация в руководстве"})
                break
            case 'LP':
                this.setState({label: "Страница входа"})
                break
            case 'RP':
                this.setState({label: "Страница регистрации"})
                break
            default:
                break
        }
    }

    render() {
        return (
            <div className="form-group">
                <div className="inputWrapper">
                    <label>{this.state.label}</label>
                    <input name={this.props.name} value={this.props.value} onChange={this.props.changeEvent}/>
                </div>
                {this.props.value?(<img className={this.props.name+"-img illustration-input-block"} src={this.props.value}/>):null}
            </div>
        )
    }
}

export default IllustrationInputWrapper
