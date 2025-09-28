function mapStateToProps(component) {
	switch (component) {
		/* база */
		case "PagesAccess": {
			return function (state) {
				return {
					member: state.member,
				}
			}
		}
		case "PollContentField": {
			return function (state) {
				return {
					member: state.member,
				}
			}
		}
		case "LoginPage": {
			return function (state) {
				return {
					illustrations: state.illustrations,
				}
			}
		}
		case "RegistrationPage": {
			return function (state) {
				return {
					illustrations: state.illustrations,
				}
			}
		}

		/* настройки */
		case "SettingsPage": {
			return function (state) {
				return {
					member: state.member,
				}
			}
		}

		/* главная страница */
		case "MainHeader": {
			return function (state) {
				return {
					main_section: state.main_section,
					member: state.member,
				}
			}
		}
		case "MobileMainHeader": {
			return function (state) {
				return {
					main_section: state.main_section,
					member: state.member,
				}
			}
		}
		case "NotificationsSection": {
			return function (state) {
				return {
					my_id: state.member.id,
				}
			}
		}
		case "CreateMessage": {
			return function (state) {
				return {
					member: state.member,
				}
			}
		}
		/* комната */
		case "RoomPage": {
			return function (state) {
				return {
					my_profile: state.member.profile,
				}
			}
		}
		case "AnswerBtns": {
			return function (state) {
				return {
					member: state.member,
				}
			}
		}
		case "AnswerHeaderBtns": {
			return function (state) {
				return {
					member: state.member,
				}
			}
		}
		case "CreateBannerRoomBtn": {
			return function (state) {
				return {
					member: state.member,
				}
			}
		}
		//форма
		case "ColorInput": {
			return function (state) {
				return {
					colors: state.colors,
				}
			}
		}
		case "ColorsBlock": {
			return function (state) {
				return {
					colors: state.colors,
				}
			}
		}
		
		// инфо-страница
		case "InfoPage": {
			return function (state) {
				return {
					member: state.member,
					illustrations: state.illustrations,
				}
			}
		}

		/* админ-панель */
		case "AdminPanelHeader": {
			return function (state) {
				return {
					active_menu_item: state.admin_panel_active_menu_item,
				}
			}
		}
		case "MobileAdminPanelHeader": {
			return function (state) {
				return {
					active_menu_item: state.admin_panel_active_menu_item,
				}
			}
		}
		case "CiteSettingsPage": {
			return function (state) {
				return {
					cite_settings_section: state.admin_panel_cite_settings_section,
					member: state.member,
					colors: state.colors,
					illustrations: state.illustrations,
				}
			}
		}
		case "WorkplanPage": {
			return function (state) {
				return {
					member: state.member,
				}
			}
		}
		case "NoteBlock": {
			return function (state) {
				return {
					my_profile_id: state.member.profile.id,
				}
			}
		}
		case "ModeratorsPage": {
			return function (state) {
				return {
					member: state.member,
				}
			}
		}
		case "UpdateListPage": {
			return function (state) {
				return {
					member: state.member,
				}
			}
		}
		case "ReportBlock": {
			return function (state) {
				return {
					member: state.member,
				}
			}
		}
		case "Article": {
			return function (state) {
				return {
					is_admin: state.member.profile.is_admin,
				}
			}
		}
		default: return undefined;
	}
}

export default mapStateToProps