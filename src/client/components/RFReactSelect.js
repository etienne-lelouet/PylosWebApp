import React from "react";
import PropTypes from "prop-types";
import CreatableSelect from "react-select/lib/Creatable";

const transformValue = (value, options) => {
	if (!value) {
		return { value: options[0].value, label: options[0].label };
	}
	return { value, label: value };
};

const singleChangeHandler = func => ((value) => {
	if (typeof value === "string") {
		func(value);
	} else {
		func(value ? value.value : "");
	}
});

class RFReactSelect extends React.Component {
	componentDidMount() {
		const {
			input: { value, onChange }, customProps: { initialValue }
		} = this.props;
		if (!value) {
			onChange(initialValue);
		}
	}

	componentDidUpdate() {
		const {
			input: { value, onChange }, customProps: { initialValue }
		} = this.props;
		if (!value) {
			onChange(initialValue);
		}
	}

	render() {
		const {
			input: {
				name, onBlur, onChange, onFocus, value
			}, options, className, customProps: { handleCreate }
		} = this.props;
		const transformedValue = transformValue(value, options);
		return (
			<CreatableSelect
				valueKey="value"
				name={name}
				value={transformedValue}
				options={options}
				onChange={singleChangeHandler(onChange)}
				onBlur={() => onBlur(value)}
				onFocus={onFocus}
				className={className}
				onCreateOption={handleCreate(onChange)}
			/>
		);
	}
}

RFReactSelect.defaultProps = {
	className: "",
	customProps: { initialValue: "" }
};

RFReactSelect.propTypes = {
	input: PropTypes.shape({
		name: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		onBlur: PropTypes.func.isRequired,
		onChange: PropTypes.func.isRequired,
		onFocus: PropTypes.func.isRequired
	}).isRequired,
	customProps: PropTypes.shape({
		intitialValue: PropTypes.string,
		handleCreate: PropTypes.func.isRequired
	}),
	options: PropTypes.array.isRequired,
	className: PropTypes.string
};

export default RFReactSelect;
