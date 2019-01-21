import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	Switch, Route, Redirect, withRouter
} from "react-router-dom";
import { getApp } from "../actions/actionsApp";
// import Footer from "../components/Footer";
import HeaderContainer from "./HeaderContainer";
import Intents from "./Intents";
import SamplesUpload from "./SamplesUpload";
import ServiceSelectorContainer from "./ServiceSelectorContainer";

class App extends React.Component {
	componentDidMount() {
		const { dispatch, token } = this.props;
		dispatch(getApp(token));
	}

	render() {
		// const { footerText } = this.props;

		return (
			<div className="app">
				<HeaderContainer />
				<ServiceSelectorContainer />
				<Switch>
					<Route path="/samplesUpload/:appName?/:intentName?" component={SamplesUpload} />
					<Route path="/intentList/:appName?/:orderBy?/:order?" component={Intents} />
					<Route path="/" render={() => <Redirect to="/intentList" />} />
				</Switch>
				{/* <Footer footerText={footerText} /> */}
			</div>
		);
	}
}

App.propTypes = {
	dispatch: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired
	// footerText: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	token: state.app.token,
	// footerText: state.app.lang.footerText,
	selectedLanguage: state.app.selectedLanguage
});

export default withRouter(connect(mapStateToProps)(App));
