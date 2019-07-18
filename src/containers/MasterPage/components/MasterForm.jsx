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
		if (this.props.formData !== prevProps.formData || this.props.editMode !== prevProps.editMode) {
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

		let processingSeq = formData[field.processingSeq] != undefined ? formData[field.processingSeq] : '0';
		this.props.dispatch(change(MASTER_FORM_CONSTANTS.masterFormName, field.processingSeq, processingSeq));

		let definitionValue = formData[field.definitionValue] ? formData[field.definitionValue] : "000";
		let definitionArray = definitionValue.split('');
		let temperature = definitionArray.length > 0 ? definitionArray[0] : '0';
		this.props.change(field.temperature, temperature);
		let pressure = definitionArray.length > 1 ? definitionArray[1] : '0';
		this.props.change(field.pressure, pressure);
		let curingTime = definitionArray.length > 2 ? definitionArray[2] : '0';
		this.props.change(field.curingTime, curingTime);
	}

	render() {
		let {
			handleSubmit, reset,
			parentCodeOptions, categoryCodeOptions,
			onReset, submissionState, connectionError
		} = this.props;
		let {formData} = this.state;
		const {field} = MASTER_FORM_CONSTANTS;

		let definitionValue = formData[field.definitionValue] ? formData[field.definitionValue] : "000";
		let definitionArray = definitionValue.split('');
		let temperature = definitionArray.length > 0 ? definitionArray[0] : '0';
		let pressure = definitionArray.length > 1 ? definitionArray[1] : '0';
		let curingTime = definitionArray.length > 2 ? definitionArray[2] : '0';

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
									onChange={e => {
										this.props.change(
											field.hiddenMasCdDuplicatedChecker,
											false
										);
										this.setState({
											formData: {
												...formData,
												[field.masCd]: e.target.value,
											}
										});
									}}
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
					<Col md={2} lg={2}></Col>
					<Col md={3} lg={3}>
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
					<Col md={2} lg={2}></Col>
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
										value: formData[field.processingSeq] != undefined
											? formData[field.processingSeq]
											: '0'
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
					<Col md={3} lg={3} style={{marginLeft:-15}}>
						<div style={{display: 'flex', flexDirection: "row", justifyContent: "space-between"}}>
							<div style={{display: 'flex',}}>
								<Field
									name={field.temperature}
									component={renderField}
									props={{
										style: {width: 35, marginRight: 5},
										value: temperature,
									}}
									onChange={e => {
										this.props.change(field.temperature, e.target.value);
										this.setState({
											formData: {
												...formData,
												[field.definitionValue]: `${e.target.value}${pressure}${curingTime}`,
											},
										});
									}}
								/>
								<span className="form__form-group-label" style={{width: 80}}>Temperature</span>
							</div>
							<div style={{display: 'flex',}}>
								<Field
									name={field.pressure}
									component={renderField}
									props={{
										style: {width: 35, marginRight: 5},
										value: pressure,
									}}
									onChange={e => {
										this.props.change(field.pressure, e.target.value);
										this.setState({
											formData: {
												...formData,
												[field.definitionValue]: `${temperature}${e.target.value}${curingTime}`,
											},
										});
									}}
								/>
								<span className="form__form-group-label" style={{width: 55}}>Pressure</span>
							</div>
							<div style={{display: 'flex',}}>
								<Field
									name={field.curingTime}
									component={renderField}
									props={{
										style: {width: 35, marginRight: 5},
										value: curingTime,
									}}
									onChange={e => {
										this.props.change(field.curingTime, e.target.value);
										this.setState({
											formData: {
												...formData,
												[field.definitionValue]: `${temperature}${pressure}${e.target.value}`,
											},
										});
									}}
								/>
								<span className="form__form-group-label" style={{width: 75}}>Curing Time</span>
							</div>
						</div>
					</Col>
					<Col md={2} lg={2}>
					</Col>
					<Col md={3} lg={3} style={{marginLeft:15
					}}>
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
							{
								(() => {
									let {failed, initial, onGoing, done} = MASTER_FORM_CONSTANTS.submissionState;
									if (this.state.editMode) {
										switch (submissionState) {
											case failed:
												return 'Failed';
											case initial:
												return 'Save';
											case onGoing:
												return 'Saving';
											case done:
												return 'Saved';
											default:
												return 'Save';
										}
									} else {
										switch (submissionState) {
											case failed:
												return 'Failed';
											case initial:
												return 'Submit';
											case onGoing:
												return 'Submitting';
											case done:
												this.props.change(
													field.hiddenMasCdDuplicatedChecker,
													formData[field.hiddenMasCdDuplicatedChecker]
												);
												return 'Submitted';
											default:
												return 'Submit';
										}
									}
								})()
							}
							{
								submissionState === MASTER_FORM_CONSTANTS.submissionState.onGoing
									? <LoadingSpinner/>
									: ''
							}
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
					<div className="form__form-group-field justify-content-center text-light">
						{connectionError}
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
		hiddenMasCdDuplicatedChecker: 'hiddenMasCdDuplicatedChecker',
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
	},
	submissionState: {
		failed: -1,
		initial: 0,
		onGoing: 1,
		done: 2,
	}
};

export default reduxForm({
	form: MASTER_FORM_CONSTANTS.masterFormName,
	validate,
})(MasterForm);
