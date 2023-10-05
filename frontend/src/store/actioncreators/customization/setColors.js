import SET_COLORS from "../../actions/customization/setColors"

function set_colors(value) {
    return {
        type: SET_COLORS,
        value: value
    }
}

export default set_colors