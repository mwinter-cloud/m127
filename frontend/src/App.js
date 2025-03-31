import React, { Component } from 'react'
import { render } from "react-dom"
import { Provider } from 'react-redux'
import store from "./store/store"
import './components/common-elements/style/App.css'
import './components/common-elements/form/style/forms.css'
import './components/common-elements/style/colors.css'
import './components/common-elements/style/illustrations.css'
import './components/common-elements/style/element.css'
import './components/common-elements/windows/style/base-for-windows.css'
import PagesAccess_wrap from "./store/wraps/base/PagesAccess_wrap"

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.StrictMode>
                <Provider store={store}>
					<PagesAccess_wrap/>
                </Provider>
            </React.StrictMode>
        )
    }
}

export default App

const container = document.getElementById("app")
render(<App />, container)