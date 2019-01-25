/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import PlayerProfile from "../components/PlayerProfile";
import { profileFetchListIfNeeded } from "../actions/actionsProfile";

class PlayerProfileContainer extends React.Component {
	componentDidMount() {
		const { dispatch, match: { params: { playerName }, user } } = this.props;
		const userToGet = playerName !== "" ? playerName : user;
		dispatch(profileFetchListIfNeeded(userToGet));
	}

	componentDidUpate() {
		const { dispatch, match: { params: { playerName }, user } } = this.props;
		const userToGet = playerName !== "" ? playerName : user;
		dispatch(profileFetchListIfNeeded(userToGet));
	}

	render() {
		const {
			user,
			displayedUserLogin,
			displayedUserUsername,
			displayedUserScore,
			displayedUserNbParties,
			displayedUserNbVictoires,
			displayedUserNbDefaites,
			usernameText,
			scoreText,
			nbPartiesText,
			nbVictoiresText,
			nbDefaitesText,
			messageProfile,
			messageProfileType,
			messageProfileText
		} = this.props;
		console.log(this.props);
		if (messageProfile) {
			return (
				<div className="intentListApp">
					<span className={messageProfileType}>
						{messageProfileText}
					</span>
				</div>
			);
		}
		return (
			<div className="intentListApp">
				<PlayerProfile {...
				{
					user,
					login: displayedUserLogin,
					username: displayedUserUsername,
					score: displayedUserScore,
					nbParties: displayedUserNbParties,
					nbVictoires: displayedUserNbVictoires,
					nbDefaites: displayedUserNbDefaites,
					usernameText,
					scoreText,
					nbPartiesText,
					nbVictoiresText,
					nbDefaitesText
				}
				}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	messageProfile: state.playerProfile.messageProfile,
	messageProfileText: state.playerProfile.messageProfileText,
	messageProfileType: state.playerProfile.messageProfileType,
	user: state.app.user,
	displayedUserLogin: state.playerProfile.login,
	displayedUserUsername: state.playerProfile.username,
	displayedUserScore: state.playerProfile.score,
	displayedUserNbParties: state.playerProfile.nbParties,
	displayedUserNbVictoires: state.playerProfile.nbVictoires,
	displayedUserNbDefaites: state.playerProfile.nbDefaites,
	usernameText: state.app.lang.username,
	scoreText: state.app.lang.score,
	nbPartiesText: state.app.lang.nbParties,
	nbVictoiresText: state.app.lang.nbVictoires,
	nbDefaitesText: state.app.lang.nbDefaites
});

export default connect(mapStateToProps)(PlayerProfileContainer);
