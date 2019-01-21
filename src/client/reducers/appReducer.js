import {
	APP_TOKEN, APP_INVALIDATE_TOKEN, APP_SIDEBAR_ERROR, APP_SIDEBAR_LISTAPPS, APP_CHANGE_LANG
} from "../actions/actionsApp";
import lang from "../config/text";

const app = (state = {}, action) => {
	switch (action.type) {
		case APP_TOKEN:
			return {
				...state,
				token: action.token
			};
		case APP_INVALIDATE_TOKEN: // en cas de token invalide
			return {
				...state,
				intents: [],
				token: "",
				fetching: false
			};
		case APP_SIDEBAR_ERROR:
			return {
				...state,
				appListError: true
			};

		case APP_SIDEBAR_LISTAPPS:
			return {
				...state,
				selectedApp: action.apps.selectedApp,
				appList: action.apps.appList
			};
		case APP_CHANGE_LANG:
			return {
				...state,
				selectedLanguage: action.value,
				lang: lang[action.value]
			};
		default:
			return state;
	}
};

export default app;
