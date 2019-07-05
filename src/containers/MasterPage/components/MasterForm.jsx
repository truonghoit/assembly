import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import {
	Card, CardBody, Col, Row, Button, ButtonToolbar,
} from 'reactstrap';
import renderCheckBoxField from '../../../shared/components/form/CheckBox';
import renderSelectField from '../../../shared/components/form/Select';
import validate from './validate';

const renderField = ({
	                     input, placeholder, type, meta: { touched, error },
                     }) => {
	return (<div className="form__form-group-input-wrap round_coner form__form-group-field-40">
		<input {...input} placeholder={placeholder} type={type} />
		{touched && error && <span className="form__form-group-error">{error}</span>}
	</div>);
};

renderField.propTypes = {
	input: PropTypes.shape().isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	meta: PropTypes.shape({
		touched: PropTypes.bool,
		error: PropTypes.string,
	}),
};

renderField.defaultProps = {
	placeholder: '',
	meta: null,
	type: 'text',
};

class MasterForm extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		reset: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen: false
		};
	}

	toggle = () => {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	render() {
		const { handleSubmit, reset} = this.props;
		return (
			<Col md={12} lg={12}>
				<Card>
					<CardBody>
						<div className="card__title">
							<h5 className="page-title">Edit</h5>
							<h5 className="subhead">Labels are left from fields</h5>
						</div>
						<form className="form form--horizontal" onSubmit={handleSubmit}>
							<div className="form__form-group ">
								<span className="form__form-group-label">Mas Code</span>
								<div className="form__form-group-field">
									<Field
										name="mas_cd"
										component={renderField}
										type="text"
										className="round_coner form__form-group-field-40"
										value="hehehe"
									/>
								</div>
							</div>
							<div className="form__form-group">
								<span className="form__form-group-label">General Name</span>
								<div className="form__form-group-field">
									<Field
										name="mas_cd_nm"
										component={renderField}
										type="text"
										className="round_coner form__form-group-field-40"
									/>
								</div>
							</div>
							<div className="form__form-group">
								<span className="form__form-group-label">Category</span>
								<div className="form__form-group-field">
									<div className="form__form-group-field-40">
										<Field
											name="cate_cd_nm"
											component={renderSelectField}
											options={[
												{ value: 'one', label: 'One' },
												{ value: 'two', label: 'Two' },
											]}

										/>
									</div>
									<div  className="form__form-group-field-20">
										<Field
											name="cate_cd"
											component="input"
											type="text"
											placeholder="Category code"
											style={{marginLeft: 20}}
										/>
									</div>
									<div style={{width: '20%'}}>
									</div>
									<div className="form__form-group-field-20 justify-content-right" style={{marginTop: 8,}}>
										<Field
											name="virtual_yn"
											component={renderCheckBoxField}
											label="Virtual(Y/N)"
											defaultChecked
										/>
									</div>
								</div>
							</div>
							<div className="form__form-group">
								<span className="form__form-group-label">Parent Code</span>
								<div className="form__form-group-field">
									<div className="form__form-group-field-40">
										<Field
											name="parent_mas_name"
											component={renderSelectField}
											options={[
												{ value: 'one', label: 'One' },
												{ value: 'two', label: 'Two' },
											]}

										/>
									</div>
									<div  className="form__form-group-field-20">
										<Field
											name="parent_mas_cd"
											component="input"
											type="text"
											placeholder="Parent mas code"
											style={{marginLeft: 20}}
										/>
									</div>
									<div  style={{width: '20%'}}>
									</div>
									<div className="form__form-group-field-20" style={{marginTop: 8,}} className="justify-content-right">
										<Field
											name="active_yn"
											component={renderCheckBoxField}
											label="Active(Y/N)"
											defaultChecked
										/>
									</div>

								</div>
							</div>
							<div className="form__form-group">
								<span className="form__form-group-label">Process Sequence</span>
								<div className="form__form-group-field">
									<Field
										name="processing_seq"
										component="input"
										type="text"
										component={renderField}
										className="round_coner form__form-group-field-40"
									/>
									<div  className="form__form-group-field-10" style={{marginLeft: 20,marginTop: 8,}}>
										<Field
											name="temperature"
											component={renderCheckBoxField}
											label="Temperature"
											defaultChecked
										/>
									</div>
									<div  className="form__form-group-field-10" style={{marginLeft: 20, marginTop: 8,}}>
										<Field
											name="pressure"
											component={renderCheckBoxField}
											label="Pressure"
											defaultChecked
										/>
									</div>
									<div  className="form__form-group-field-10" style={{marginLeft: 20, marginTop: 8,}}>
										<Field
											name="CurringTime"
											component={renderCheckBoxField}
											label="curringTime"
											defaultChecked
										/>
									</div>
									<div style={{width: '5%',}}>
									</div>
									<div style={{width: '20%', marginTop: 8}} className="justify-content-right">
										<Field
											name="sys_code_yn"
											component={renderCheckBoxField}
											label="Sys Code(Y/N)"
											defaultChecked
										/>
									</div>
								</div>
							</div>
							<div className="form__form-group">
								<span className="form__form-group-label">Description</span>
								<div className="form__form-group-field">
									<Field
										name="defaultInput"
										component="input"
										type="text"
									/>
								</div>
							</div>
							<div className="form__form-group-field justify-content-center">
								<Button color="primary" type="submit">Submit</Button>
								<Button type="button" onClick={reset}>
									Cancel
								</Button>
							</div>


						</form>
					</CardBody>
				</Card>
			</Col>
		);
	}
}

export default reduxForm({
	form: 'MasterForm',
	validate,
})(MasterForm);
