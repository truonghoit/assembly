import MAPPING_STITCH_CONSTANTS from "../constants";

const validate = (values) => {
	let errors                   = {};
	const {field} = MAPPING_STITCH_CONSTANTS;

	if (!values[field.macAddress] || (values[field.macAddress] && !values[field.macAddress].trim())) {
		errors[field.macAddress] = 'Mac Address field shouldn\'t be empty';
	} else if (values[field.macAddress].length > 30) {
		errors[field.macAddress] = 'Mac Address field shouldn\'t longer than 30 characters';
	}
	if (values[field.hiddenMasCdDuplicatedChecker]) {
		errors[field.macAddress] = 'Duplicated Mac Address Found! Please use another one or select a table row below'
		                           + ' to edit.';
	}

	console.log("values[field.factoryCode: ", values[field.factoryCode]);
	if (!values[field.factoryCode]) {
		errors[field.factoryCode] = 'Factory code field shouldn\'t be empty';
	}

	if (!values[field.lineCode]) {
		errors[field.lineCode] = 'Line code field shouldn\'t be empty';
	}

	console.log("values[field.processName: ", values[field.processName]);
	if (!values[field.processName]) {
		errors[field.processName] = 'Process code field shouldn\'t be empty';
	}

	if (!values[field.posittionCode]) {
		errors[field.posittionCode] = 'Posittion code field shouldn\'t be empty';
	}

	if (values[field.description] && values[field.description].trim().length > 300) {
		errors[field.description] = 'Description field shouldn\'t be longer than 300 characters';
	}
	return errors;
};

export default validate;
