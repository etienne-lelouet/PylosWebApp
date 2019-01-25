import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import endpoint from "../config/config";
import { appRegisterLogin, changeLang } from "../actions/actionsApp";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.handleLanguageChangeClick = this.handleLanguageChangeClick.bind(this);
	}

	submit(values) {
		const { dispatch } = this.props;
		return fetch(endpoint.login, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				login: values.login,
				password: values.password
			})
		}).then(response => response.json().then((json) => {
			if (json.errors) {
				if (Array.isArray(json.errors)) {
					const errors = {};
					json.errors.forEach((error) => {
						if (error.type === "param") {
							errors[error.param] = this.props[error.msg];
						}
					});
					throw new SubmissionError(errors);
				} else {
					throw new SubmissionError({ _error: "Erreur lors de la connexion" });
				}
			} else if (json.token !== "") {
				localStorage.setItem("token", json.token);
				localStorage.setItem("login", values.login);
				dispatch(appRegisterLogin(json.token, values.login));
			} else {
				throw new SubmissionError({ _error: "Erreur lors de la connexion" });
			}
		}));
	}

	handleLanguageChangeClick(e) {
		const { dispatch } = this.props;
		return dispatch(changeLang(e.target.value));
	}

	renderField({
		input, label, type, meta: { error }
	}) {
		return (
			<div className="inputField">
				<input {...input} placeholder={label} type={type} />
				{error && <span className="errorLogin">{error}</span>}
			</div>
		);
	}

	render() {
		const {
			handleSubmit, error, availableLanguages, selectedLanguage, login, registerText, loginFieldText, passwordFieldText
		} = this.props;
		return (
			<div className="loginFormContainer">
				<form onSubmit={handleSubmit(this.submit)} className="loginForm">
					{/* <div className="logoContainer"><img src={require("../ressources/images/logo.png")} className="imgLogo" alt="logoKick" /></div> */}
					<Field name="login" component={this.renderField} type="text" label={loginFieldText} />
					<Field name="password" component={this.renderField} type="password" label={passwordFieldText} />
					{error && <span className="errorLogin">{error}</span>}
					<div>
						<button type="submit">{login}</button>
					</div>
				</form>
				<Link to="/register">{registerText}</Link>
				<select className="selectLang" onChange={this.handleLanguageChangeClick} selected={selectedLanguage} defaultValue={selectedLanguage}>
					{availableLanguages.map(elem => <option key={elem} value={elem}>{elem}</option>)}
				</select>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	selectedLanguage: state.app.selectedLanguage,
	availableLanguages: state.app.availableLanguages,
	unkownError: state.app.lang.unkownError,
	unavailableData: state.app.lang.unavailableData,
	invalidLogin: state.app.lang.invalidLogin,
	loginDoesNotExist: state.app.lang.loginDoesNotExist,
	invalidPassword: state.app.lang.invalidPassword,
	incorrectPassword: state.app.lang.incorrectPassword,
	login: state.app.lang.login,
	registerText: state.app.lang.registerText,
	loginFieldText: state.app.lang.loginFieldText,
	passwordFieldText: state.app.lang.passwordFieldText
});

LoginForm = connect(mapStateToProps)(LoginForm);
export default reduxForm({
	form: "login"
})(LoginForm);
