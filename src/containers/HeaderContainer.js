import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeLang, invalidateToken } from "../actions/actionsApp";
import Header from "../components/Header";

class HeaderContainer extends React.Component {
	constructor(props) {
		super(props);
		this.handleDisconnectClick = this.handleDisconnectClick.bind(this);
		this.handleLanguageChangeClick = this.handleLanguageChangeClick.bind(this);
	}

	handleDisconnectClick(e) {
		e.preventDefault();
		const { dispatch } = this.props;
		dispatch(invalidateToken());
		localStorage.removeItem("token");
	}

	handleLanguageChangeClick(e) {
		const { dispatch } = this.props;
		return dispatch(changeLang(e.target.value));
	}

	render() {
		const {
			availableLanguages, headerText, disconnect, selectedLanguage
		} = this.props;

		const headerProps = {
			logout: this.handleDisconnectClick,
			changeLanguage: this.handleLanguageChangeClick,
			availableLanguages,
			selectedLanguage,
			headerText,
			disconnect
		};

		return <Header {...headerProps} />;
	}
}

HeaderContainer.propTypes = {
	dispatch: PropTypes.func.isRequired,
	selectedLanguage: PropTypes.string.isRequired,
	availableLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
	disconnect: PropTypes.string.isRequired,
	headerText: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	token: state.app.token,
	selectedLanguage: state.app.selectedLanguage,
	disconnect: state.app.lang.disconnect,
	headerText: state.app.lang.headerText,
	availableLanguages: state.app.availableLanguages
});

export default connect(mapStateToProps)(HeaderContainer);
