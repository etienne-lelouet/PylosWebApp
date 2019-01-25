import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import endpoint from "../config/config";
import { appRegisterLogin, changeLang } from "../actions/actionsApp";

class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.handleLanguageChangeClick = this.handleLanguageChangeClick.bind(this);
	}

	submit(values) {
		const { dispatch } = this.props;
		return fetch(endpoint.register, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				login: values.login,
				password: values.password,
				passwordConfirmation: values.passwordConfirmation,
				username: values.username
			})
		}).then(response => response.json().then((json) => {
			if (json.errors) {
				if (Array.isArray(json.errors)) {
					const errors = {};
					json.errors.forEach((error) => {
						if (error.type === "param") {
							errors[error.param] = error.msg;
						}
					});
					throw new SubmissionError(errors);
				} else {
					throw new SubmissionError({ _error: "registerError" });
				}
			} else if (json.token !== "") {
				localStorage.setItem("token", json.token);
				dispatch(appRegisterLogin(json.token));
			} else {
				throw new Error({});
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
			availableLanguages, selectedLanguage, handleSubmit, error, loginFieldText, passwordFieldText, passwordConfirmationFieldText, usernameFieldText, register, loginText
		} = this.props;
		return (
			<div className="loginFormContainer">
				<form onSubmit={handleSubmit(this.submit)} className="loginForm">
					<Field name="login" component={this.renderField} type="text" label={loginFieldText} />
					<Field name="password" component={this.renderField} type="password" label={passwordFieldText} />
					<Field name="passwordConfirmation" component={this.renderField} type="password" label={passwordConfirmationFieldText} />
					<Field name="username" component={this.renderField} type="text" label={usernameFieldText} />
					{error && <span className="errorLogin">{error}</span>}
					<div>
						<button type="submit">{register}</button>
					</div>
				</form>
				<Link to="/">{loginText}</Link>
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
	passwordFieldText: state.app.lang.passwordFieldText,
	passwordConfirmationFieldText: state.app.lang.passwordConfirmationFieldText,
	usernameFieldText: state.app.lang.usernameFieldText,
	register: state.app.lang.register,
	loginText: state.app.lang.loginText
});

RegisterForm = connect(mapStateToProps)(RegisterForm);
export default reduxForm({
	form: "registerForm"
})(RegisterForm);
