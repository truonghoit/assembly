
const validate = (values) => {
	console.log("values: ", values);
	const errors = {};
	if (!values.filterFromDate || (values.filterFromDate && !values.filterFromDate.toString().trim())) {
		console.log("6666666666666666666666666");
		errors.filterFromDate = 'From date field shouldn\'t be empty';
	}
	console.log("errors: ", errors);
	return errors;
};

export default validate;
