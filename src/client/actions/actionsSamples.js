import { endpoint } from "../config/config";
import { invalidateToken } from "./actionsApp";

export const SAMPLES_FETCHED_INTENTS = "SAMPLES_FETCH_INTENTS";
export const SAMPLES_DISPLAY_MESSAGE = "SAMPLES_DISPLAY_ERRORS";
export const SAMPLES_HIDE_MESSAGE = "SAMPLES_HIDE_ERRORS";
export const SAMPLES_UPLOAD_SUCESS = "SAMPLES_UPLOAD_SUCESS";
export const SAMPLES_ADD_INTENT = "SAMPLES_ADD_INTENT";

export const intentsReturnFetchedData = values => ({ type: SAMPLES_FETCHED_INTENTS, values });

export const displayMessage = (messageSamplesText, messageSamplesType) => (
	{ type: SAMPLES_DISPLAY_MESSAGE, values: { messageSamplesText, messageSamplesType } }
);

export const addIntentToList = intentValue => ({ type: SAMPLES_ADD_INTENT, values: intentValue });

export const hideErrors = () => ({ type: SAMPLES_HIDE_MESSAGE });

export const generateMessage = (messageCode, type) => (dispatch, getState) => {
	const { app: { lang } } = getState();
	const messageText = lang[messageCode];
	dispatch(displayMessage(messageText, type));
};

export const fetchIntentList = selectedApp => async (dispatch, getState) => {
	const { app: { token } } = getState();
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: token
		}
	};
	try {
		const response = await fetch(`${endpoint.getIntents}?appName=${selectedApp}`, options);
		const json = await response.json();
		switch (response.status) {
			case 401:
				return dispatch(invalidateToken());
			case 400:
			case 500:
				return dispatch(generateMessage("internalServerError", "error"));
			case 200:
				break;
			default:
				return dispatch(generateMessage("unknownError", "error"));
		}
		const intents = json.values.map(({ value }) => (value));
		return dispatch(intentsReturnFetchedData(intents));
	} catch (e) {
		return dispatch(generateMessage("unknownError", "error"));
	}
};

export const displaySamplesListError = errorList => (dispatch, getState) => {
	const { app: { lang } } = getState();
	let errorString = "";
	errorList.forEach(({ field, line, error }) => {
		errorString += `${field}: ${lang.line} ${line} : ${lang[error]} \n`;
	});
	dispatch(displayMessage(errorString, "error"));
};
