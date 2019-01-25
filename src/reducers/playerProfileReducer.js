import {
	PROFILE_DATA_FETCHING,
	PROFILE_DATA_FETCHED,
	PROFILE_DATA_ERROR,
	PROFILE_DISPLAY_MESSAGE
} from "../actions/actionsProfile";

const playerProfile = (state = {}, action) => {
	switch (action.type) {
		case PROFILE_DATA_FETCHING:
			return {
				...state,
				fetching: true
			};
		case PROFILE_DATA_FETCHED:
			return {
				...state,
				fetching: false,
				login: action.values.login,
				username: action.values.username,
				score: action.values.score,
				nbParties: action.values.nbParties,
				nbVictoires: action.values.nbVictoires,
				nbDefaites: action.values.nbDefaites,
				messageProfile: false,
				messageProfileText: "",
				messageProfileType: ""
			};
		case PROFILE_DATA_ERROR:
			return {
				...state,
				fetching: false
			};
		case PROFILE_DISPLAY_MESSAGE:
			return {
				...state,
				messageProfile: true,
				messageProfileText: action.values.messageText,
				messageProfileType: action.values.type
			};
		default:
			return state;
	}
};

export default playerProfile;
