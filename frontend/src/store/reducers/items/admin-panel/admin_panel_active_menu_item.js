import SET_ADMIN_PANEL_ACTIVE_MENU_ITEM from "../../../actions/admin-panel/setAdminPanelActiveMenuItem"
import initialState from "../../../initialState"


export default function admin_panel_active_menu_item(state=initialState.admin_panel_active_menu_item, action) {
    switch(action.type) {
       case SET_ADMIN_PANEL_ACTIVE_MENU_ITEM: return state = action.value
        default: return state
    }
}
