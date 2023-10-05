import { createStore } from 'redux'
import reducers from './reducers/reducers.js'
import initialState from './initialState.js'

const store = createStore(reducers, initialState)

export default store