import SET_ADMIN_PANEL_CITE_SETTINGS_SECTION from "../../actions/admin-panel/setAdminPanelCiteSettingsSection"

function set_admin_panel_cite_settings_section(value) {
    return {
        type: SET_ADMIN_PANEL_CITE_SETTINGS_SECTION,
        value: value
    }
}

export default set_admin_panel_cite_settings_section