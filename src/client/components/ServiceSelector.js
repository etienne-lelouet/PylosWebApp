import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

const ServiceSelector = ({ pathname, samplesUpload, intentsList }) => {
	const toIntentList = pathname.includes("/samplesUpload/") ? pathname.replace("/samplesUpload/", "/intentList/") : "/intentList";
	const toSamplesList = pathname.includes("/intentList/") ? pathname.replace("/intentList/", "/samplesUpload/") : "/samplesUpload";
	return (
		<div className="serviceSelector">

			<div className={pathname.includes("/intentList") ? "selectedServiceName" : "serviceName"}>
				<Link to={toIntentList}>{intentsList}</Link>
			</div>
			<div className={pathname.includes("/samplesUpload") ? "selectedServiceName" : "serviceName"}>
				<Link to={toSamplesList}>{samplesUpload}</Link>
			</div>
		</div>
	);
};

ServiceSelector.propTypes = {
	samplesUpload: PropTypes.string.isRequired,
	intentsList: PropTypes.string.isRequired,
	pathname: PropTypes.string.isRequired
};


export default ServiceSelector;
