import React from "react";
import { Link } from "react-router-dom";

const ServiceSelector = ({ pathname }) => {
	return (
		<div className="serviceSelector">
			<div className={pathname.includes("/playerProfile") ? "selectedServiceName" : "serviceName"}>
				<Link to="/playerProfile">playerProfile</Link>
			</div>
			<div className={pathname.includes("/Leaderboards") ? "selectedServiceName" : "serviceName"}>
				<Link to="/leaderboards">leaderboards</Link>
			</div>
		</div>
	);
};

export default ServiceSelector;
