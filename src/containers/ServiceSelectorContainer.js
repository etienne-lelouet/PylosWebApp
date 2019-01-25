import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import ServiceSelector from "../components/ServiceSelector";

const ServiceSelectorContainer = ({ location: { pathname } }) => (
	<ServiceSelector {...{ pathname }} />
);

const mapStateToProps = state => ({
});

ServiceSelectorContainer.propTypes = {
	samplesUpload: PropTypes.string.isRequired,
	intentsList: PropTypes.string.isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};

export default withRouter(connect(mapStateToProps)(ServiceSelectorContainer));
