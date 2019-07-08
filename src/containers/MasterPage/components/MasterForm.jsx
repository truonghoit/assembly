import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, Col,} from 'reactstrap';
import renderCheckBoxField from '../../../shared/components/form/CheckBox';
import renderSelectField from '../../../shared/components/form/Select';
import validate from './validate';
import {renderField} from "../../../shared/components/form/InputField";

class MasterForm extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		reset: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen: false,
			categoryCodeOptions: [{
				value: "",
				label: "",
			}],
			selectedCategoryCode: {
				value: "",
				label: "",
			},
			parentCodeOptions: [{
				value: "",
				label: "",
			}],
			selectedParentCode: {
				value: "",
				label: "",
			},
			disableMasCode: false,
		};
	}

	toggle = () => {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	};

	onCategoryCodeSelected = (selectedOption) => {
		this.setState({
			selectedCategoryCode: selectedOption
		});
	};

	onParentCodeSelected = (selectedOption) => {
		/*if (selectedOption.value) {
			this.props.dispatch(change('MasterForm', 'processing_seq', "0"));
			this.setState({
				disableProcessSeq: true,
			});
		}
		if (!selectedOption.value) {
			this.setState({
				disableProcessSeq: false,
			});
		}*/
		this.setState({
			selectedParentCode: selectedOption
		});
	};

	componentDidMount() {
		//this.loadCombo();
	}



	componentDidUpdate() {
		let {saveOk} = this.props;
		if (saveOk) {
			//this.loadCombo();

		}
		//
	}

	render() {
		const {handleSubmit, reset, categoryCodeOptions, parentCodeOptions } = this.props;
		const {disableMasCode, disableProcessSeq} = this.state;
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
										onChange={this.handleChange}
										disabled={disableMasCode}
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
											options={categoryCodeOptions}
											placeholder={categoryCodeOptions[0] ? categoryCodeOptions[0].label : ""}
											onChange={this.onCategoryCodeSelected}

										/>
									</div>
									<div className="form__form-group-field-20" style={{marginLeft: 8}}>
										<Field
											name="cate_cd"
											component={renderField}
											props={{disabled: true}}
											type="text"
											placeholder={this.state.selectedCategoryCode ? this.state.selectedCategoryCode.value : ""}
										/>
									</div>
									<div style={{width: '20%'}}>
									</div>
									<div className="form__form-group-field-20 justify-content-right"
									     style={{marginTop: 8,}}>
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
											options={parentCodeOptions}
											placeholder={parentCodeOptions[0] ? parentCodeOptions[0].label : ""}
											onChange={this.onParentCodeSelected}
										/>
									</div>
									<div className="form__form-group-field-20" style={{marginLeft: 8}}>
										<Field
											name="parent_mas_cd"
											component={renderField}
											props={{disabled: true}}
											type="text"
											placeholder={this.state.selectedParentCode ? this.state.selectedParentCode.value : ""}

										/>
									</div>
									<div style={{width: '20%'}}>
									</div>
									<div className="form__form-group-field-20"
									     style={{marginTop: 8,}} className="justify-content-right">
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
										disabled={disableProcessSeq}
									/>
									<div className="form__form-group-field-10"
									     style={{marginLeft: 20, marginTop: 8,}}>
										<Field
											name="temperature"
											component={renderCheckBoxField}
											label="Temperature"
											defaultChecked
										/>
									</div>
									<div className="form__form-group-field-10"
									     style={{marginLeft: 20, marginTop: 8,}}>
										<Field
											name="pressure"
											component={renderCheckBoxField}
											label="Pressure"
											defaultChecked
										/>
									</div>
									<div className="form__form-group-field-10"
									     style={{marginTop: 8,}}>
										<Field
											name="curringTime"
											component={renderCheckBoxField}
											label="curringTime"
											defaultChecked
										/>
									</div>
									<div style={{width: '8%',}}>
									</div>
									<div style={{width: '20%', marginTop: 8}}
									     className="justify-content-right">
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
										name="remark"
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
