import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PlayerProfile from "../components/PlayerProfile";

const PlayerProfileContainer = (props) => {
	const {
		match: { params: { playerName } }
	} = props;

	return (
		<div className="intentListApp">
			<PlayerProfile />
		</div>
	);
};

PlayerProfileContainer.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			appName: PropTypes.string
		})
	})
};

PlayerProfileContainer.defaultProps = {
	match: {
		params: {
			playerName: ""
		}
	}
};

const mapStateToProps = state => ({
	appList: state.app.appList
});

export default connect(mapStateToProps)(PlayerProfileContainer);
