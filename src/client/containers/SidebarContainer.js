import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";

const SidebarContainer = (props) => {
	const {
		appList, selectedApp, appListError, appListText, url
	} = props;
	const sidebarProps = {
		appList,
		selectedApp,
		appListError,
		appListText,
		url
	};
	return (
		<Sidebar {...sidebarProps} />
	);
};

SidebarContainer.propTypes = {
	appListError: PropTypes.bool.isRequired,
	selectedApp: PropTypes.string,
	appList: PropTypes.arrayOf(PropTypes.string).isRequired,
	appListText: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired
};

SidebarContainer.defaultProps = {
	selectedApp: ""
};


const mapStateToProps = state => ({
	appListError: state.app.appListError,
	appListText: state.app.lang.appListText,
	appList: state.app.appList
});

export default connect(mapStateToProps)(SidebarContainer);
