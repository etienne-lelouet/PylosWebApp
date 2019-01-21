import React from "react";
import PropTypes from "prop-types";

const Message = ({ messageType, message }) => (
	<span className={messageType}>
		{message}
	</span>
);

Message.propTypes = {
	messageType: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired
};

export default Message;
