import React, {Component} from 'react';
import {change, Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, Col,} from 'reactstrap';
import renderCheckBoxField from '../../../shared/components/form/CheckBox';
import renderSelectField from '../../../shared/components/form/Select';
import validate from './validate';
import {renderField} from "../../../shared/components/form/InputField";
import Spinner from "../../../shared/components/spinner/Spinner";

class MasterForm extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		reset: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.submitBtnText = 'Submit';
		this.state = {
			categoryCodeOptions: [{
				value: "",
				label: "---",
			}],
			parentCodeOptions: [{
				value: "",
				label: "---",
			}],
			editMode: false,
			formData: {},
		};
	}

	componentDidMount() {
		//this.loadCombo();
	}


	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.formData !== prevProps.formData) {
			this.setState({
				formData: this.props.formData,
				editMode: this.props.editMode,
			});
		}

		let {formData} = this.state;
		let mas_cd = formData.mas_cd ? formData.mas_cd : '';
		this.props.dispatch(change('MasterForm', 'mas_cd', mas_cd));

		let mas_cd_nm = formData.mas_cd_nm ? formData.mas_cd_nm : '';
		this.props.dispatch(change('MasterForm', 'mas_cd_nm', mas_cd_nm));

		let cate_cd_nm = formData.cate_cd_nm ? formData.cate_cd_nm : '';
		this.props.dispatch(change('MasterForm', 'cate_cd_nm', cate_cd_nm));

		let cate_cd = formData.cate_cd ? formData.cate_cd : '';
		this.props.dispatch(change('MasterForm', 'cate_cd', cate_cd));

		let processing_seq = formData.processing_seq !== undefined || formData.processing_seq !== null ? formData.processing_seq : 0
		this.props.dispatch(change('MasterForm', 'processing_seq', processing_seq));
	}

	render() {
		let {handleSubmit, reset, categoryCodeOptions, parentCodeOptions, onEditModeChange, submittingState} = this.props;
		let {disableProcessSeq, formData} = this.state;

		let definition_value = formData.definition_value ? formData.definition_value : "000";
		let definitionArray = definition_value.split('').map(v => parseInt(v));
		let temperature = definitionArray.length > 0 && definitionArray[0] === 1;
		let pressure = definitionArray.length > 0 && definitionArray[1] === 1;
		let curringTime = definitionArray.length > 0 && definitionArray[2] === 1;
		console.log("formData.cate_cd: ", formData.cate_cd);

		return (
			<Col md={12} lg={12}>
						<div className="card__title">
							<h5 className="page-title">Edit</h5>
						</div>
						<form className="form form--horizontal" onSubmit={handleSubmit}>
							<div className="form__form-group ">
								<span className="form__form-group-label">Mas Code</span>
								<div className="form__form-group-field">
									<Field
										name="mas_cd"
										component={renderField}
										props={{
											value: formData.mas_cd ? formData.mas_cd : '',
										}}
										type="text"
										className="round_coner form__form-group-field-40"
										disabled={this.state.editMode === true}
										onChange={e => {
											this.setState({
												formData: {
													...formData,
													mas_cd: e.target.value,
												}
											});
										}}
									/>
								</div>
							</div>
							<div className="form__form-group">
								<span className="form__form-group-label">General Name</span>
								<div className="form__form-group-field">
									<Field
										name="mas_cd_nm"
										component={renderField}
										props={{
											value: formData.mas_cd_nm ? formData.mas_cd_nm : ''
										}}
										type="text"
										className="round_coner form__form-group-field-40"
										onChange={e => this.setState({
											formData: {
												...formData,
												mas_cd_nm: e.target.value,
											}
										})}
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
											props={{
												selected: {
													value: formData.cate_cd ? formData.cate_cd : '',
													label: formData.cate_cd_nm ? formData.cate_cd_nm : '---',
												},
											}}
											placeholder={formData.cate_cd_nm ? formData.cate_cd_nm : '---'}
											onChange={selectedOption => {
												console.log("selectedOption: ", selectedOption);
												this.setState({
													formData: {
														...formData,
														cate_cd_nm: selectedOption.label,
														cate_cd: selectedOption.value,
													}
												})
											}}
										/>
									</div>
									<div className="form__form-group-field-20"
									     style={{marginLeft: 8}}>
										<Field
											name="cate_cd"
											component={renderField}
											props={{
												disabled: true,
												value: formData.cate_cd ? formData.cate_cd : ''
											}}
											type="text"
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
											checked={formData.virtual_yn === 1}
											onChange={e => {
												if (e.target) {
													this.setState({
														formData: {
															...formData,
															virtual_yn: e.target.checked ? 1 : 0,
														},
													});
												} else {
													this.setState({
														formData: {
															...formData,
															virtual_yn: e ? 1 : 0,
														},
													});
												}
											}}
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
											props={{
												selected: {
													value: formData.parent_mas_cd ? formData.parent_mas_cd : '',
													label: formData.parent_mas_name ? formData.parent_mas_name : '---',
												},
											}}
											placeholder={formData.parent_mas_name ? formData.parent_mas_name : '---'}
											onChange={selectedOption => this.setState({
												formData: {
													...formData,
													parent_mas_name: selectedOption.label,
													parent_mas_cd: selectedOption.value,
												}
											})}
										/>
									</div>
									<div className="form__form-group-field-20"
									     style={{marginLeft: 8}}>
										<Field
											name="parent_mas_cd"
											component={renderField}
											props={{
												disabled: true,
												value: formData.parent_mas_cd ? formData.parent_mas_cd : ''
											}}
											type="text"
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
											checked={formData.active_yn === 1}
											onChange={e => {
												if (e.target) {
													this.setState({
														formData: {
															...formData,
															active_yn: e.target.checked ? 1 : 0,
														},
													});
												} else {
													this.setState({
														formData: {
															...formData,
															active_yn: e ? 1 : 0,
														},
													});
												}
											}}
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
										props={{
											value: formData.processing_seq !== undefined || formData.processing_seq !== null
												? formData.processing_seq
												: 0
										}}
										className="round_coner form__form-group-field-40"
										disabled={disableProcessSeq}
										onChange={e => this.setState({
											formData: {
												...formData,
												processing_seq: e.target.value,
											}
										})}
									/>
									<div className="form__form-group-field-10"
									     style={{marginLeft: 20, marginTop: 8,}}>
										<Field
											name="temperature"
											component={renderCheckBoxField}
											label="Temperature"
											checked={temperature}
											onChange={e => {
												if (e.target) {
													this.setState({
														formData: {
															...formData,
															definition_value: `${e.target.checked ? 1 : 0}${pressure ? 1 : 0}${curringTime ? 1 : 0}`,
														},
													});
												} else {
													this.setState({
														formData: {
															...formData,
															definition_value: `${e ? 1 : 0}${pressure ? 1 : 0}${curringTime ? 1 : 0}`,
														},
													});
												}
											}}
										/>
									</div>
									<div className="form__form-group-field-10"
									     style={{marginLeft: 20, marginTop: 8,}}>
										<Field
											name="pressure"
											component={renderCheckBoxField}
											label="Pressure"
											checked={pressure}
											onChange={e => {
												if (e.target) {
													this.setState({
														formData: {
															...formData,
															definition_value: `${temperature ? 1 : 0}${e.target.checked ? 1 : 0}${curringTime ? 1 : 0}`,
														},
													});
												} else {
													this.setState({
														formData: {
															...formData,
															definition_value: `${temperature ? 1 : 0}${e ? 1 : 0}${curringTime ? 1 : 0}`,
														},
													});
												}
											}}
										/>
									</div>
									<div className="form__form-group-field-10"
									     style={{marginTop: 8,}}>
										<Field
											name="curringTime"
											component={renderCheckBoxField}
											label="curringTime"
											checked={curringTime}
											onChange={e => {
												if (e.target) {
													this.setState({
														formData: {
															...formData,
															definition_value: `${temperature ? 1 : 0}${pressure ? 1 : 0}${e.target.checked ? 1 : 0}`,
														},
													});
												} else {
													this.setState({
														formData: {
															...formData,
															definition_value: `${temperature ? 1 : 0}${pressure ? 1 : 0}${e ? 1 : 0}`,
														},
													});
												}
											}}
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
											checked={formData.sys_code_yn === 1}
											onChange={e => {
												if (e.target) {
													this.setState({
														formData: {
															...formData,
															sys_code_yn: e.target.checked ? 1 : 0,
														},
													});
												} else {
													this.setState({
														formData: {
															...formData,
															sys_code_yn: e ? 1 : 0,
														},
													});
												}
											}}
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
										props={{
											value: formData.remark ? formData.remark : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												remark: e.target.value,
											}
										})}
									/>
								</div>
							</div>
							<div className="form__form-group-field justify-content-center">
								<Button color="primary" type="submit">
									{(() => {
										if (this.state.editMode) {
											switch (submittingState) {
												case -1:
													return 'Save';
												case 0:
													return 'Saving';
												case 1:
													return 'Saved';
												default:
													return 'Save';
											}
										} else {
											switch (submittingState) {
												case -1:
													return 'Submit';
												case 0:
													return 'Submitting';
												case 1:
													return 'Submitted';
												default:
													return 'Submit';
											}
										}
									})()}
									{submittingState === 0 ? <Spinner/> : ''}
								</Button>
								<Button type="button" onClick={() => {
									reset();
									this.setState({
										formData: {},
										editMode: false,
									});
									onEditModeChange(false);
								}}>
									Cancel
								</Button>
							</div>
						</form>
			</Col>
		);
	}
}

export default reduxForm({
	form: 'MasterForm',
	validate,
})(MasterForm);
