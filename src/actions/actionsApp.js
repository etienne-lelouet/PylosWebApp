import lang from "../config/text";

export const APP_INVALIDATE_TOKEN = "APP_INVALIDATE_TOKEN";
export const APP_TOKEN = "APP_TOKEN";
export const APP_CHANGE_LANG = "APP_CHANGE_LANG";

export const invalidateToken = () => ({ type: APP_INVALIDATE_TOKEN });

export const appRegisterLogin = (token, user) => ({ type: APP_TOKEN, values: { token, user } });

export const changeLang = (selectedLang) => {
	if (!lang[selectedLang]) {
		return { type: APP_CHANGE_LANG, value: "fr" };
	}
	return { type: APP_CHANGE_LANG, value: selectedLang };
};
