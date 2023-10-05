import SET_COLORS from "../../../actions/customization/setColors"
import initialState from "../../../initialState"


export default function colors(state=initialState.colors, action) {
    switch(action.type) {
       case SET_COLORS: return state = action.value
        default: return state
    }
}
