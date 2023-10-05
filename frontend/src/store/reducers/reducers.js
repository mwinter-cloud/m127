import { combineReducers } from 'redux'
import admin_panel_active_menu_item from './items/admin-panel/admin_panel_active_menu_item'
import admin_panel_cite_settings_section from "./items/admin-panel/admin_panel_cite_settings_section"
import member from "./items/member/member"
import main_section from "./items/base/main_section"
import colors from "./items/customization/colors"
import illustrations from "./items/customization/illustrations"

const reducers = combineReducers({
    admin_panel_active_menu_item,
    admin_panel_cite_settings_section,
    member,
    main_section,
    colors,
    illustrations,
})

export default reducers