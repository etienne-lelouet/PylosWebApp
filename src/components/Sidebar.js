import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Message from "./Message.js";


const Sidebar = ({
	appList, selectedApp, appListError, appListText, url
}) => (
	<div className="sideBar">
		<span>{appListText}</span>
		{appListError ? <Message message="Erreur lors de la récupération des applications" messageType="error" /> : null}
		<ul className="appList">
			{appList.map((element) => {
				const className = element === selectedApp ? "selectedAppText" : "appText";
				return <li key={element} className={className}><Link to={`${url}/${element}`}><span>{element}</span></Link></li>;
			})}
		</ul>
	</div>
);

Sidebar.propTypes = {
	appListError: PropTypes.bool.isRequired,
	selectedApp: PropTypes.string,
	appList: PropTypes.arrayOf(PropTypes.string).isRequired,
	appListText: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired
};

Sidebar.defaultProps = {
	selectedApp: ""
};

export default Sidebar;
