import SET_ILLUSTRATIONS from "../../actions/customization/setIllustrations"

function set_illustrations(value) {
    return {
        type: SET_ILLUSTRATIONS,
        value: value
    }
}

export default set_illustrations