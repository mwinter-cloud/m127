import SET_ADMIN_PANEL_CITE_SETTINGS_SECTION from "../../../actions/admin-panel/setAdminPanelCiteSettingsSection";
import initialState from "../../../initialState"


export default function admin_panel_cite_settings_section(state=initialState.admin_panel_cite_settings_section, action) {
    switch(action.type) {
       case SET_ADMIN_PANEL_CITE_SETTINGS_SECTION: return state = action.value
        default: return state
    }
}
