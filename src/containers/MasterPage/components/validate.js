import {MASTER_FORM_CONSTANTS} from "./MasterForm";

const validate = (values) => {
	const {field} = MASTER_FORM_CONSTANTS;
	const errors = {};
	if (!values[field.masCd]) {
		errors[field.masCd] = 'Mas code field shouldn’t be empty';
	}
	if (!values[field.masCdNm]) {
		errors[field.masCdNm] = 'General Name field shouldn’t be empty';
	}
	if (!values[field.catCdNm] || (values[field.catCdNm] && values[field.catCdNm].value == "")) {
		errors[field.catCdNm] = 'Please select the category';
	}
	if (!values[field.parentMasNm] || (values[field.parentMasNm] && values[field.parentMasNm].value == "")) {
		if (values[field.processingSeq] < 0){
			errors[field.processingSeq] = 'If parent mas code is empty, process sequence should be' +
				' greater or equal 0';
		}
	}

	/*if (values.parent_mas_name && (values.processing_seq <= 0)){
		errors.processing_seq = 'If parent mas code is selected, process sequence should greater' +
			' than 0';
	}*/
	if (values[field.processingSeq] === undefined || values[field.processingSeq] === null) {
		errors[field.processingSeq] = 'Process sequence field shouldn’t be empty';
	} else if (!/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/i.test(values[field.processingSeq])) {
		errors[field.processingSeq] = 'Process sequence should be number';
	}
  return errors;
};

export default validate;
