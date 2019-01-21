import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Button = ({ handleRefreshClick, isRefreshing, text: { refresh, refreshing } }) => (
	<button type="button" className="buttonRefresh" onClick={handleRefreshClick}>{isRefreshing ? refreshing : refresh }</button>
);

Button.propTypes = {
	handleRefreshClick: PropTypes.func.isRequired,
	isRefreshing: PropTypes.bool.isRequired,
	text: PropTypes.shape({
		refresh: PropTypes.string.isRequired,
		refreshing: PropTypes.string.isRequired
	}).isRequired
};

const mapStateToProps = state => ({
	isRefreshing: state.intents.fetching

});

export default connect(mapStateToProps)(Button);
