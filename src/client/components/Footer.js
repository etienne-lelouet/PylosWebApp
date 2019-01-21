import React from "react";
import PropTypes from "prop-types";

const Footer = ({ footerText }) => (
	<div className="footerContainer">
		<span className="footerText">{footerText}</span>
	</div>
);

Footer.propTypes = {
	footerText: PropTypes.string.isRequired
};

export default Footer;
