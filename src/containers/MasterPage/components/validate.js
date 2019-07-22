import MASTER_FORM_CONSTANTS from "../constants";

const validate = (values) => {
	const {field} = MASTER_FORM_CONSTANTS;
	const errors = {};
	if (!values[field.masCd.name] || (values[field.masCd.name] && !values[field.masCd.name].trim())) {
		errors[field.masCd.name] = 'Mas Code field shouldn\'t be empty';
	} else if (/\s/g.test(values[field.masCd.name])) {
		errors[field.masCd.name] = 'White space isn\'t allowed';
	} else if (/[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]+/.test(values[field.masCd.name])) { // Only allow letters, digits, and - (minus sign)
		errors[field.masCd.name] = 'Mas Code field shouldn\'t include special characters';
	} else if (values[field.masCd.name].length > field.masCd.maxLength) {
		errors[field.masCd.name] = `Mas Code field shouldn\'t exceed ${field.masCd.maxLength} characters`;
	}
	if (values[field.hiddenMasCdDuplicatedChecker]) {
		errors[field.masCd.name] = 'Duplicated Mas Code Found! Please use another one or select a table row below to edit.';
	}

	if (!values[field.masCdNm.name] || (values[field.masCdNm.name] && !values[field.masCdNm.name].trim())) {
		errors[field.masCdNm.name] = 'General Name field shouldn\'t be empty';
	} else if (values[field.masCdNm.name].length > field.masCdNm.maxLength) {
		errors[field.masCdNm.name] = `General Name field shouldn\'t exceed ${field.masCdNm.maxLength} characters`;
	}

	if (!values[field.catCd]) {
		errors[field.catCdNm] = 'Please select a category';
	}
	if (values[field.processingSeq.name] == undefined) {
		errors[field.processingSeq.name] = 'Process Sequence field shouldn\'t be empty';
	} else if (/\s/g.test(values[field.processingSeq.name])) {
		errors[field.processingSeq.name] = 'White space isn\'t allowed';
	} else if (!/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/i.test(values[field.processingSeq.name])) {
		errors[field.processingSeq.name] = 'Process Sequence should be number';
	} else if (values[field.processingSeq.name].length > field.processingSeq.maxLength) {
		errors[field.processingSeq.name] = `Process Sequence shouldn\'t exceed ${field.processingSeq.maxLength} characters`;
	}
	return errors;
};

export default validate;
