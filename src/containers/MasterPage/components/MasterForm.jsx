import React, {Component} from 'react';
import {change, Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, Col,} from 'reactstrap';
import renderCheckBoxField from '../../../shared/components/form/CheckBox';
import renderSelectField from '../../../shared/components/form/Select';
import validate from './validate';
import {renderField} from "../../../shared/components/form/InputField";
import LoadingSpinner from "../../../shared/components/loading_spinner/LoadingSpinner";
import MASTER_FORM_CONSTANTS from "../constants";

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
		this.props.change(field.masCd.name, formData[field.masCd.name] ? formData[field.masCd.name] : '');
		this.props.change(field.masCdNm.name, formData[field.masCdNm.name] ? formData[field.masCdNm.name] : '');

		this.props.change(field.catCdNm, formData[field.catCdNm] ? formData[field.catCdNm] : '---');
		this.props.change(field.catCd, formData[field.catCd] ? formData[field.catCd] : '');

		this.props.change(field.parentMasNm, formData[field.parentMasNm] ? formData[field.parentMasNm] : '---');
		this.props.change(field.parentMasCd, formData[field.parentMasCd] ? formData[field.parentMasCd] : '');

		this.props.change(
			field.processingSeq.name,
			formData[field.processingSeq.name] != undefined ? formData[field.processingSeq.name] : '0'
		);

		let definitionValue = formData[field.definitionValue] ? formData[field.definitionValue] : "000";
		let definitionArray = definitionValue.split('');
		this.props.change(field.temperature, definitionArray.length > 0 ? definitionArray[0] : '0');
		this.props.change(field.pressure, definitionArray.length > 1 ? definitionArray[1] : '0');
		this.props.change(field.curingTime, definitionArray.length > 2 ? definitionArray[2] : '0');

		this.props.change(field.virtualYn, formData[field.virtualYn]);
		this.props.change(field.activeYn, formData[field.activeYn]);
		this.props.change(field.sysCodeYn, formData[field.sysCodeYn]);

		this.props.change(field.description, formData[field.description] ? formData[field.description] : '');
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
									name={field.masCd.name}
									component={renderField}
									props={{
										disabled: this.state.editMode === true,
										value: formData[field.masCd.name] ? formData[field.masCd.name] : ''
									}}
									type="text"
									className="form__form-group-field-100"
									onChange={(event, newValue) => {
										this.props.change(
											field.hiddenMasCdDuplicatedChecker,
											false
										);
										this.setState({
											formData: {
												...formData,
												[field.masCd.name]: newValue,
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
									name={field.masCdNm.name}
									component={renderField}
									props={{
										value: formData[field.masCdNm.name] ? formData[field.masCdNm.name] : ''
									}}
									type="text"
									className="form__form-group-field-100"
									onChange={(event, newValue) => this.setState({
										formData: {
											...formData,
											[field.masCdNm.name]: newValue,
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
								onChange={(event, newValue) => {
									this.setState({
										formData: {
											...formData,
											[field.virtualYn]: newValue ? 1 : 0,
										},
									});
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
								onChange={(event, newValue) => {
									this.setState({
										formData: {
											...formData,
											[field.activeYn]: newValue ? 1 : 0,
										},
									});
								}}
							/>
						</div>
					</Col>
					<Col md={4} lg={4}>
						<div className="form__form-group marginLeft-15">
							<span className="form__form-group-label">Process Sequence</span>
							<div className="form__form-group-field">
								<Field
									name={field.processingSeq.name}
									component="input"
									type="text"
									component={renderField}
									props={{
										value: formData[field.processingSeq.name] != undefined
											? formData[field.processingSeq.name]
											: '0'
									}}
									className="round_corner form__form-group-field-100"
									onChange={(event, newValue) => this.setState({
										formData: {
											...formData,
											[field.processingSeq.name]: newValue,
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
									onChange={(event, newValue) => {
										let definitionValueRange = MASTER_FORM_CONSTANTS.definitionValueRange;
										let value = newValue[1];  // Only get latest character user typed
										if (value > definitionValueRange[definitionValueRange.length - 1]) {
											value = definitionValueRange[definitionValueRange.length - 1];
										} else if ( // Is a character OR less than 'definitionValueRange[0]'
											!(value in definitionValueRange) || value < definitionValueRange[0]
										) {
											value = definitionValueRange[0];
										}
										this.props.change(field.temperature, value);
										this.setState({
											formData: {
												...formData,
												[field.definitionValue]: `${value}${pressure}${curingTime}`,
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
									onChange={(event, newValue) => {
										let definitionValueRange = MASTER_FORM_CONSTANTS.definitionValueRange;
										let value = newValue[1];  // Only get latest character user typed
										if (value > definitionValueRange[definitionValueRange.length - 1]) {
											value = definitionValueRange[definitionValueRange.length - 1];
										} else if ( // Is a character OR less than 'definitionValueRange[0]'
											!(value in definitionValueRange) || value < definitionValueRange[0]
										) {
											value = definitionValueRange[0];
										}
										this.props.change(field.pressure, value);
										this.setState({
											formData: {
												...formData,
												[field.definitionValue]: `${temperature}${value}${curingTime}`,
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
									onChange={(event, newValue) => {
										let definitionValueRange = MASTER_FORM_CONSTANTS.definitionValueRange;
										let value = newValue[1];  // Only get latest character user typed
										if (value > definitionValueRange[definitionValueRange.length - 1]) {
											value = definitionValueRange[definitionValueRange.length - 1];
										} else if ( // Is a character OR less than 'definitionValueRange[0]'
											!(value in definitionValueRange) || value < definitionValueRange[0]
										) {
											value = definitionValueRange[0];
										}
										this.props.change(field.curingTime, value);
										this.setState({
											formData: {
												...formData,
												[field.definitionValue]: `${temperature}${pressure}${value}`,
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
								onChange={(event, newValue) => {
									this.setState({
										formData: {
											...formData,
											[field.sysCodeYn]: newValue ? 1 : 0,
										},
									});
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
									onChange={(event, newValue) => this.setState({
										formData: {
											...formData,
											[field.description]: newValue,
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
												this.props.change(
													field.hiddenMasCdDuplicatedChecker,
													formData[field.hiddenMasCdDuplicatedChecker]
												);
												return 'Failed';
											case initial:
												return 'Submit';
											case onGoing:
												return 'Submitting';
											case done:
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

export default reduxForm({
	form: MASTER_FORM_CONSTANTS.masterFormName,
	validate,
})(MasterForm);
