import endpoint from "../config/config";
import { invalidateToken } from "./actionsApp";

export const LEADERBOARD_FETCHED_PLAYERS = "LEADERBOARDS_FETCHED_PLAYERS";
export const LEADERBOARD_DISPLAY_MESSAGE = "LEADERBOARD_DISPLAY_MESSAGE";

export const leaderboardReturnFetchedPlayers = values => ({ type: LEADERBOARD_FETCHED_PLAYERS, values });

export const displayMessage = (messageText, type) => (
	{ type: LEADERBOARD_DISPLAY_MESSAGE, values: { messageText, type } }
);

export const generateMessage = (messageCode, type) => (dispatch, getState) => {
	const { app: { lang } } = getState();
	const messageText = lang[messageCode];
	dispatch(displayMessage(messageText, type));
};

export const fetchPlayerList = () => async (dispatch, getState) => {
	const { app: { token } } = getState();
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: token
		}
	};
	try {
		const response = await fetch(`${endpoint.getPlayers}`, options);
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
		return dispatch(leaderboardReturnFetchedPlayers(json));
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
