/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import { fetchPlayerList } from "../actions/actionsLeaderboard";
import Leaderboard from "../components/Leaderboard";

class LeaderboardContainer extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchPlayerList());
	}

	componentDidUpate() {
		const { dispatch } = this.props;
		dispatch(fetchPlayerList());
	}

	render() {
		const {
			user,
			userList,
			messageLeaderboards,
			messageLeaderboardsText,
			messageLeaderboardsType,
			usernameText,
			scoreText,
			nbPartiesText,
			nbVictoiresText,
			nbDefaitesText
		} = this.props;

		if (messageLeaderboards) {
			return (
				<div>
					<span className={messageLeaderboardsText}>
						{messageLeaderboardsType}
					</span>
				</div>
			);
		}
		console.log(userList);
		return (
			<div className="intentListApp">
				<Leaderboard {...{ user, userList, usernameText, scoreText, nbPartiesText, nbVictoiresText, nbDefaitesText }} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.app.user,
	messageProfile: state.leaderboard.messageProfile,
	messageProfileText: state.leaderboard.messageLeaderboardText,
	messageProfileType: state.leaderboard.messageLeaderboardType,
	userList: state.leaderboard.userList,
	usernameText: state.app.lang.username,
	scoreText: state.app.lang.score,
	nbPartiesText: state.app.lang.nbParties,
	nbVictoiresText: state.app.lang.nbVictoires,
	nbDefaitesText: state.app.lang.nbDefaites
});

export default connect(mapStateToProps)(LeaderboardContainer);
