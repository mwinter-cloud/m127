import SET_MAIN_SECTION from "../../actions/base/setMainSection"

function set_main_section(value) {
    return {
        type: SET_MAIN_SECTION,
        value: value
    }
}

export default set_main_section