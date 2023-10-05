import { bindActionCreators } from 'redux'
import set_admin_panel_active_menu_item from "./actioncreators/admin-panel/setAdminPanelActiveMenuItem"
import set_admin_panel_cite_settings_section from "./actioncreators/admin-panel/setAdminPanelCiteSettingsSection"
import set_member from "./actioncreators/member/setMember"
import set_main_section from "./actioncreators/base/setMainSection"
import set_colors from "./actioncreators/customization/setColors"
import set_illustrations from "./actioncreators/customization/setIllustrations"

function mapDispatchToProps(component) {
    switch(component) {
        /* база */
        case "PagesAccess": return function(dispatch) {
            return {
				set_member: bindActionCreators(set_member, dispatch),
				set_colors: bindActionCreators(set_colors, dispatch),
				set_illustrations: bindActionCreators(set_illustrations, dispatch),
			}
        }
        case "RoomsPage": return function(dispatch) {
            return {
				set_section: bindActionCreators(set_main_section, dispatch),
			}
        }
        case "Polls": return function(dispatch) {
            return {
				set_section: bindActionCreators(set_main_section, dispatch),
			}
        }
        //профиль
        case "ProfilePage": return function(dispatch) {
            return {
				set_section: bindActionCreators(set_main_section, dispatch),
			}
        }
        //настройки
        case "SettingsPage": return function(dispatch) {
            return {
				set_section: bindActionCreators(set_main_section, dispatch),
			}
        }
        /* вход и регистрация */
        case "LoginPage": return function(dispatch) {
            return {
				set_member: bindActionCreators(set_member, dispatch),
			}
        }
        case "RegistrationPage": return function(dispatch) {
            return {
				set_member: bindActionCreators(set_member, dispatch),
			}
        }
        /* комната */
        case "RoomPage": return function(dispatch) {
            return {
				set_section: bindActionCreators(set_main_section, dispatch),
			}
        }
        /* админ-панель */
        case "WorkplanPage": return function(dispatch) {
            return {
				set_menu_item: bindActionCreators(set_admin_panel_active_menu_item, dispatch),
			}
        }
        case "UpdateListPage": return function(dispatch) {
            return {
				set_menu_item: bindActionCreators(set_admin_panel_active_menu_item, dispatch),
			}
        }
        case "ModeratorsPage": return function(dispatch) {
            return {
				set_menu_item: bindActionCreators(set_admin_panel_active_menu_item, dispatch),
			}
        }
        case "ReportsPage": return function(dispatch) {
            return {
				set_menu_item: bindActionCreators(set_admin_panel_active_menu_item, dispatch),
			}
        }
        case "CiteSettingsPage": return function(dispatch) {
            return {
				set_menu_item: bindActionCreators(set_admin_panel_active_menu_item, dispatch),
				set_form_section: bindActionCreators(set_admin_panel_cite_settings_section, dispatch),
				set_colors: bindActionCreators(set_colors, dispatch),
				set_illustrations: bindActionCreators(set_illustrations, dispatch),
			}
        }
        case "GuidePage": return function(dispatch) {
            return {
				set_menu_item: bindActionCreators(set_admin_panel_active_menu_item, dispatch),
			}
        }
        default: return undefined;
    }
}

export default mapDispatchToProps