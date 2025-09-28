import SET_MEMBER from "../../actions/member/setMember"

function set_member(value) {
    return {
        type: SET_MEMBER,
        value: value
    }
}

export default set_member