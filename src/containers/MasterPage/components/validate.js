const validate = (values) => {
	const errors = {};
	if (!values.parent_mas_cd && !values.mas_cd) {
		errors.mas_cd = 'Mas code field shouldn’t be empty';
	}
	if (!values.mas_cd_nm) {
		errors.mas_cd_nm = 'General Name field shouldn’t be empty';
	}

	if (!values.cate_cd) {
		errors.cate_cd_nm = 'Please select the category';
	}
	if (!values.parent_mas_cd && (values.processing_seq != 0)) {
		errors.processing_seq = 'If parent mas code is empty, process sequence should be 0';
	}

	if (values.parent_mas_cd && (values.processing_seq <= 0)){
		errors.processing_seq = 'If parent mas code is selected, process sequence should greater' +
			' than 0';
	}
	if (!values.processing_seq) {
		errors.processing_seq = 'Process sequence field shouldn’t be empty';
	}
  return errors;
};

export default validate;
