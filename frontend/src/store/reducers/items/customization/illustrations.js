import SET_ILLUSTRATIONS from "../../../actions/customization/setIllustrations"
import initialState from "../../../initialState"


export default function illustrations(state=initialState.illustrations, action) {
    switch(action.type) {
       case SET_ILLUSTRATIONS: return state = action.value
        default: return state
    }
}
