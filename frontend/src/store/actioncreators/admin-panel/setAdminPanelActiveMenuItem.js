import SET_ADMIN_PANEL_ACTIVE_MENU_ITEM from "../../actions/admin-panel/setAdminPanelActiveMenuItem"

function set_admin_panel_active_menu_item(value) {
    return {
        type: SET_ADMIN_PANEL_ACTIVE_MENU_ITEM,
        value: value
    }
}

export default set_admin_panel_active_menu_item