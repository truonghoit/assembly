const validate = (values) => {
	const errors = {};
	if (!values.mas_cd) {
		errors.mas_cd = 'Mas code field shouldn’t be empty';
	}
	if (!values.mas_cd_nm) {
		errors.mas_cd_nm = 'General Name field shouldn’t be empty';
	}

	if (!values.cate_cd) {
		errors.cate_cd_nm = 'Please select the category';
	}
	if (!values.parent_mas_cd) {
		errors.parent_mas_name = 'Please select the parent';
	}
	if (!values.processing_seq) {
		errors.processing_seq = 'Process sequence field shouldn’t be empty';
	}
  return errors;
};

export default validate;
