const validate = (values) => {
	const errors = {};
	if (!values.mas_cd) {
		errors.mas_cd = 'Mas code field shouldn’t be empty';
	}
	if (!values.mas_cd_nm) {
		errors.mas_cd_nm = 'General Name field shouldn’t be empty';
	}
	if (!values.cate_cd_nm || (values.cate_cd_nm && values.cate_cd_nm.value == "")) {
		errors.cate_cd_nm = 'Please select the category';
	}
	if (!values.parent_mas_name || (values.parent_mas_name && values.parent_mas_name.value == "")) {
		if (values.processing_seq < 0){
			errors.processing_seq = 'If parent mas code is empty, process sequence should be' +
				' greater or equal 0';
		}
	}

	/*if (values.parent_mas_name && (values.processing_seq <= 0)){
		errors.processing_seq = 'If parent mas code is selected, process sequence should greater' +
			' than 0';
	}*/
	if (!values.processing_seq) {
		errors.processing_seq = 'Process sequence field shouldn’t be empty';
	} else if (!/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/i.test(values.processing_seq)) {
		errors.processing_seq = 'Process sequence should be number';
	}
  return errors;
};

export default validate;
