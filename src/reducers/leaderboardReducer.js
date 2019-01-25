import { LEADERBOARD_FETCHED_PLAYERS } from "../actions/actionsLeaderboard";

const leaderboards = (state = {}, action) => {
	switch (action.type) {
		case LEADERBOARD_FETCHED_PLAYERS:
			return {
				...state,
				userList: action.values.res
			};

		default:
			return state;
	}
};

export default leaderboards;
