import React from "react";
import PropTypes from "prop-types";

const Header = ({
	logout, headerText, disconnect, availableLanguages, changeLanguage, selectedLanguage
}) => (
	<div className="headerContainer">
		<span className="headerTitle">{headerText}</span>
		<select className="selectLang" onChange={changeLanguage} selected={selectedLanguage} defaultValue={selectedLanguage}>
			{availableLanguages.map(elem => <option key={elem} value={elem}>{elem}</option>)}
		</select>
		<button type="button" className="buttonLogout" onClick={logout}>{disconnect}</button>
	</div>
);

Header.propTypes = {
	logout: PropTypes.func.isRequired,
	headerText: PropTypes.string.isRequired,
	disconnect: PropTypes.string.isRequired,
	availableLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
	changeLanguage: PropTypes.func.isRequired,
	selectedLanguage: PropTypes.string.isRequired
};

export default Header;
