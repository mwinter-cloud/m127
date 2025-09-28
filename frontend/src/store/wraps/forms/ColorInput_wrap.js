import { connect } from 'react-redux'
import mapStateToProps from "../../mapStateToProps"
import mapDispatchToProps from "../../mapDispatchToProps"
import ColorInput from "../../../components/common-elements/form/elements/palette/ColorInput"

const ColorInput_wrap = connect(mapStateToProps("ColorInput"), mapDispatchToProps("ColorInput"))(ColorInput)

export default ColorInput_wrap