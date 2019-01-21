import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	Route, withRouter
} from "react-router-dom";
import Login from "../components/Login";
import App from "./App";
import "../styles/app.css";

const AppRouter = ({ isLogged }) => (
	<Route path="/" component={isLogged !== "" ? App : Login} />
);

AppRouter.propTypes = {
	isLogged: PropTypes.string
};

AppRouter.defaultProps = {
	isLogged: ""
};

const mapStateToProps = state => ({
	isLogged: state.app.token
});

export default withRouter(connect(mapStateToProps)(AppRouter));
