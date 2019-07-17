import React, {Component} from 'react';
import {change, Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, Col,} from 'reactstrap';
import renderCheckBoxField from '../../../shared/components/form/CheckBox';
import renderSelectField from '../../../shared/components/form/Select';
import validate from './validate';
import {renderField} from "../../../shared/components/form/InputField";
import LoadingSpinner from "../../../shared/components/loading_spinner/LoadingSpinner";

class MasterForm extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		reset: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
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


	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.formData !== prevProps.formData) {
			this.setState({
				formData: this.props.formData,
				editMode: this.props.editMode,
			});
		}

		let {formData} = this.state;
		const {field} = MASTER_FORM_CONSTANTS;
		let masCdNm = formData[field.masCdNm] ? formData[field.masCdNm] : '';
		this.props.dispatch(change(MASTER_FORM_CONSTANTS.masterFormName, field.masCdNm, masCdNm));

		let masCd = formData[field.masCd] ? formData[field.masCd] : '';
		this.props.dispatch(change(MASTER_FORM_CONSTANTS.masterFormName, field.masCd, masCd));

		let cateCdNm = formData[field.catCdNm] ? formData[field.catCdNm] : '';
		this.props.dispatch(change(MASTER_FORM_CONSTANTS.masterFormName, field.catCdNm, cateCdNm));

		let cateCd = formData[field.catCd] ? formData[field.catCd] : '';
		this.props.dispatch(change(MASTER_FORM_CONSTANTS.masterFormName, field.catCd, cateCd));

		let processingSeq = formData[field.processingSeq] !== undefined || formData[field.processingSeq] !== null
			? formData[field.processingSeq]
			: '';
		this.props.dispatch(change(MASTER_FORM_CONSTANTS.masterFormName, field.processingSeq, processingSeq));
	}

	render() {
		let {handleSubmit, reset, categoryCodeOptions, parentCodeOptions, onReset, submissionState} = this.props;
		let {formData} = this.state;
		const {field} = MASTER_FORM_CONSTANTS;

		let definitionValue = formData[field.definitionValue] ? formData[field.definitionValue] : "000";
		let definitionArray = definitionValue.split('').map(v => parseInt(v));
		let temperature = definitionArray.length > 0 && definitionArray[0] === 1;
		let pressure = definitionArray.length > 0 && definitionArray[1] === 1;
		let curingTime = definitionArray.length > 0 && definitionArray[2] === 1;

		return (
			<Col md={12} lg={12}>
				<form className="form form--horizontal" onSubmit={handleSubmit}>
					<Col md={4} lg={4}>
						<div className="form__form-group marginLeft-15">
							<span className="form__form-group-label">Mas Code</span>
							<div className="form__form-group-field">
								<Field
									name={field.masCd}
									component={renderField}
									props={{
										disabled: this.state.editMode === true,
										value: formData[field.masCd] ? formData[field.masCd] : ''
									}}
									type="text"
									className="form__form-group-field-100"
									onChange={e => this.setState({
										formData: {
											...formData,
											[field.masCd]: e.target.value,
										}
									})}
								/>
							</div>
						</div>
					</Col>
					<Col md={8} lg={8}>
					</Col>
					<Col md={4} lg={4}>
						<div className="form__form-group marginLeft-15">
							<span className="form__form-group-label">General Name</span>
							<div className="form__form-group-field">
								<Field
									name={field.masCdNm}
									component={renderField}
									props={{
										value: formData[field.masCdNm] ? formData[field.masCdNm] : ''
									}}
									type="text"
									className="form__form-group-field-100"
									onChange={e => this.setState({
										formData: {
											...formData,
											[field.masCdNm]: e.target.value,
										}
									})}
								/>
							</div>
						</div>
					</Col>
					<Col md={8} lg={8}>
					</Col>
					<Col md={4} lg={4}>
						<div className="form__form-group marginLeft-15">
							<span className="form__form-group-label">Category</span>
							<div className="form__form-group-field">
								<Field
									name={field.catCdNm}
									component={renderSelectField}
									options={categoryCodeOptions}
									props={{
										selected: {
											value: formData[field.catCd] ? formData[field.catCd] : '',
											label: formData[field.catCdNm] ? formData[field.catCdNm] : '---',
										},
									}}
									placeholder={formData[field.catCdNm] ? formData[field.catCdNm] : '---'}
									className="form__form-group-field-100"
									onChange={selectedOption => {
										this.setState({
											formData: {
												...formData,
												[field.catCdNm]: selectedOption.label,
												[field.catCd]: selectedOption.value,
											}
										})
									}}
								/>
							</div>
						</div>
					</Col>
					<Col md={3} lg={3}>
						<Field
							name={field.catCd}
							component={renderField}
							props={{
								disabled: true,
								value: formData[field.catCd] ? formData[field.catCd] : ''
							}}
							className="marginLeft-15"
							type="text"
						/>
					</Col>
					<Col md={5} lg={5}>
						<div className="form__form-group-field">
							<Field
								name={field.virtualYn}
								component={renderCheckBoxField}
								label="Virtual(Y/N)"
								checked={formData[field.virtualYn] === 1}
								onChange={e => {
									if (e.target) {
										this.setState({
											formData: {
												...formData,
												[field.virtualYn]: e.target.checked ? 1 : 0,
											},
										});
									} else {
										this.setState({
											formData: {
												...formData,
												[field.virtualYn]: e ? 1 : 0,
											},
										});
									}
								}}
							/>
						</div>
					</Col>
					<Col md={4} lg={4}>
						<div className="form__form-group marginLeft-15">
							<span className="form__form-group-label">Parent Code</span>
							<div className="form__form-group-field">
								<Field
									name={field.parentMasNm}
									component={renderSelectField}
									options={parentCodeOptions}
									props={{
										selected: {
											value: formData[field.parentMasCd] ? formData[field.parentMasCd] : '',
											label: formData[field.parentMasNm] ? formData[field.parentMasNm] : '---',
										},
									}}
									placeholder={formData[field.parentMasNm] ? formData[field.parentMasNm] : '---'}
									onChange={selectedOption => this.setState({
										formData: {
											...formData,
											[field.parentMasNm]: selectedOption.label,
											[field.parentMasCd]: selectedOption.value,
										}
									})}
									className="form__form-group-field-100"
								/>
							</div>
						</div>
					</Col>
					<Col md={3} lg={3}>
						<Field
							name={field.parentMasCd}
							component={renderField}
							props={{
								disabled: true,
								value: formData[field.parentMasCd] ? formData[field.parentMasCd] : ''
							}}
							className="marginLeft-15"
							type="text"
						/>
					</Col>
					<Col md={3} lg={3}>
						<div className="form__form-group-field">
							<Field
								name={field.activeYn}
								component={renderCheckBoxField}
								label="Active(Y/N)"
								checked={formData[field.activeYn] === 1}
								onChange={e => {
									if (e.target) {
										this.setState({
											formData: {
												...formData,
												[field.activeYn]: e.target.checked ? 1 : 0,
											},
										});
									} else {
										this.setState({
											formData: {
												...formData,
												[field.activeYn]: e ? 1 : 0,
											},
										});
									}
								}}
							/>
						</div>
					</Col>
					<Col md={4} lg={4}>
						<div className="form__form-group marginLeft-15">
							<span className="form__form-group-label">Process Sequence</span>
							<div className="form__form-group-field">
								<Field
									name={field.processingSeq}
									component="input"
									type="text"
									component={renderField}
									props={{
										value: formData[field.processingSeq] != undefined || formData[field.processingSeq] != null
											? formData[field.processingSeq]
											: ''
									}}
									className="round_corner form__form-group-field-100"
									onChange={e => this.setState({
										formData: {
											...formData,
											[field.processingSeq]: e.target.value,
										}
									})}
								/>
							</div>
						</div>
					</Col>
					<Col md={3} lg={3}>
						<div className="form__form-group-field">
							<div style={{marginLeft: -140, marginTop: 8,}}>
								<Field
									name={field.temperature}
									component={renderCheckBoxField}
									label="Temperature"
									checked={temperature}
									onChange={e => {
										if (e.target) {
											this.setState({
												formData: {
													...formData,
													[field.definitionValue]: `${e.target.checked ? 1 : 0}${pressure ? 1 : 0}${curingTime ? 1 : 0}`,
												},
											});
										} else {
											this.setState({
												formData: {
													...formData,
													[field.definitionValue]: `${e ? 1 : 0}${pressure ? 1 : 0}${curingTime ? 1 : 0}`,
												},
											});
										}
									}}
								/>
							</div>
							<div style={{marginLeft: 10, marginTop: 8,}}>
								<Field
									name={field.pressure}
									component={renderCheckBoxField}
									label="Pressure"
									checked={pressure}
									onChange={e => {
										if (e.target) {
											this.setState({
												formData: {
													...formData,
													[field.definitionValue]: `${temperature ? 1 : 0}${e.target.checked ? 1 : 0}${curingTime ? 1 : 0}`,
												},
											});
										} else {
											this.setState({
												formData: {
													...formData,
													[field.definitionValue]: `${temperature ? 1 : 0}${e ? 1 : 0}${curingTime ? 1 : 0}`,
												},
											});
										}
									}}
								/>
							</div>
							<div style={{marginLeft: 10, marginTop: 8,}}>
								<Field
									name={field.curingTime}
									component={renderCheckBoxField}
									label="Curing Time"
									checked={curingTime}
									onChange={e => {
										if (e.target) {
											this.setState({
												formData: {
													...formData,
													[field.definitionValue]: `${temperature ? 1 : 0}${pressure ? 1 : 0}${e.target.checked ? 1 : 0}`,
												},
											});
										} else {
											this.setState({
												formData: {
													...formData,
													[field.definitionValue]: `${temperature ? 1 : 0}${pressure ? 1 : 0}${e ? 1 : 0}`,
												},
											});
										}
									}}
								/>
							</div>
						</div>
					</Col>
					<Col md={5} lg={5}>
						<div className="form__form-group-field">
							<Field
								name={field.sysCodeYn}
								component={renderCheckBoxField}
								label="Sys Code(Y/N)"
								checked={formData[field.sysCodeYn] === 1}
								onChange={e => {
									if (e.target) {
										this.setState({
											formData: {
												...formData,
												[field.sysCodeYn]: e.target.checked ? 1 : 0,
											},
										});
									} else {
										this.setState({
											formData: {
												...formData,
												[field.sysCodeYn]: e ? 1 : 0,
											},
										});
									}
								}}
							/>
						</div>
					</Col>
					<Col md={4} lg={4}>
						<div className="form__form-group marginLeft-15">
							<span className="form__form-group-label">Description</span>
							<div className="form__form-group-field">
								<Field
									name={field.description}
									component="input"
									type="text"
									props={{
										value: formData[field.description] ? formData[field.description] : ''
									}}
									onChange={e => this.setState({
										formData: {
											...formData,
											[field.description]: e.target.value,
										}
									})}
								/>
							</div>
						</div>
					</Col>
					<Col md={8} lg={8}>
					</Col>
					<div className="form__form-group-field justify-content-center">
						<Button color="primary" type="submit">
							{(() => {
								if (this.state.editMode) {
									switch (submissionState) {
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
									switch (submissionState) {
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
							{submissionState === 0 ? <LoadingSpinner/> : ''}
						</Button>
						<Button type="button" onClick={() => {
							reset();
							this.setState({
								formData: {},
								editMode: false,
							});
							onReset();
						}}>
							Cancel
						</Button>
					</div>
				</form>
			</Col>
		);
	}
}

export const MASTER_FORM_CONSTANTS = {
	masterFormName: 'MasterForm',
	field: {
		masCd: 'masCd',
		masCdNm: 'masCdName',

		catCdNm: 'cateCdName',
		catCd: 'cateCd',

		parentMasNm: 'parentMasName',
		parentMasCd: 'parentMasCd',

		virtualYn: 'virtualYn',
		activeYn: 'activeYn',
		sysCodeYn: 'sysCodeYn',

		processingSeq: 'processingSeq',

		definitionValue: 'definitionValue',
		temperature: 'temperature',
		pressure: 'pressure',
		curingTime: 'curingTime',

		description: 'remark',
	}
};

export default reduxForm({
	form: MASTER_FORM_CONSTANTS.masterFormName,
	validate,
})(MasterForm);
