import {
	APP_TOKEN, APP_INVALIDATE_TOKEN, APP_CHANGE_LANG
} from "../actions/actionsApp";
import lang from "../config/text";

const app = (state = {}, action) => {
	switch (action.type) {
		case APP_TOKEN:
			return {
				...state,
				token: action.values.token,
				user: action.values.user
			};
		case APP_INVALIDATE_TOKEN: // en cas de token invalide
			return {
				...state,
				intents: [],
				token: "",
				fetching: false
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
