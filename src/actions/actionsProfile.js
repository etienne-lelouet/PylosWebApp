import { invalidateToken } from "./actionsApp";
import endpoint from "../config/config";

export const PROFILE_DATA_FETCHING = "INTENTS_DATA_FETCHING";
export const PROFILE_DATA_FETCHED = "PROFILE_DATA_FETCHED";
export const PROFILE_DATA_ERROR = "INTENTS_DATA_ERROR";
export const PROFILE_DISPLAY_MESSAGE = "PROFILE_DISPLAY_MESSAGE";
export const profileFetchData = () => ({ type: PROFILE_DATA_FETCHING });

export const profileReturnFetchedData = values => ({ type: PROFILE_DATA_FETCHED, values });

export const intentsDataError = ({ type: PROFILE_DATA_ERROR });

export const displayMessage = (messageText, type) => (
	{ type: PROFILE_DISPLAY_MESSAGE, values: { messageText, type } }
);

export const generateMessage = (messageCode, type) => (dispatch, getState) => {
	const { app: { lang } } = getState();
	const messageText = lang[messageCode];
	dispatch(displayMessage(messageText, type));
};


export const getProfileData = (token, user) => (dispatch) => {
	dispatch(profileFetchData());
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: token
		}
	};
	let uri;
	if (user) {
		uri = `${endpoint.getProfile}?user=${user}`;
	} else {
		uri = `${endpoint.getProfile}`;
	}
	return fetch(uri, options).then(response => response.json().then((json) => {
		console.log("rzezarerazrzela");
		switch (response.status) {
			case 401:
				return dispatch(invalidateToken());
			case 400:
				break;
			case 500:
				dispatch(intentsDataError());
				return dispatch(generateMessage("internalServerError", "error"));
			case 200:
				break;
			default:
				dispatch(intentsDataError());
				return dispatch(generateMessage("unknownError", "error"));
		}
		if (response.status === 400) {
			console.log("rzezarerazrzela");
			if (json.errors[0].msg === "loginDoesNotExist") {
				return dispatch(generateMessage("userDoesNotExit", "error"));
			}
				return dispatch(generateMessage("internalServerError", "error"));
		}
		return dispatch(profileReturnFetchedData(json));
	})).catch((e) => {
		dispatch(generateMessage("unknownError", "error"))
	});
};

// export const changePage = (_id, page, pageNumber, next) => (dispatch, getState) => {
// 	const { intents: { intents }, app: { token } } = getState();
// 	const index = intents.findIndex(({ _id: intentId }) => intentId === _id);
// 	if (!intents[index].displaySamples) {
// 		return dispatch(displaySamples(_id));
// 	}
// 	let nextPage = page;
// 	if (next) {
// 		nextPage = page + 1 > pageNumber ? page : page + 1;
// 	} else {
// 		nextPage = page - 1 < 1 ? page : page - 1;
// 	}
// 	return intentGetSamples(_id, token, nextPage).then(
// 		({ samples, pageNumber: returnedPageNumber }) => {
// 			if (samples && pageNumber) {
// 				dispatch(intentDisplaySamples(index, samples, returnedPageNumber, nextPage, true));
// 			}
// 		}
// 	);
// };

const profileShouldFetch = ({ playerProfile: { fetching } }) => {
	if (fetching) {
		return false;
	}
	return true;
};

export const profileFetchListIfNeeded = user => (dispatch, getState) => {
	// on ne recupère la liste que si on n'est pas déjà en train de récupérer une liste
	if (profileShouldFetch(getState())) {
		const { app: { token } } = getState();
		return (dispatch(getProfileData(token, user)));
	}
	return Promise.resolve();
};
