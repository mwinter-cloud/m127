import SET_MEMBER from "../../../actions/member/setMember"
import initialState from "../../../initialState"


export default function member(state=initialState.member, action) {
    switch(action.type) {
       case SET_MEMBER: return state = action.value
        default: return state
    }
}
