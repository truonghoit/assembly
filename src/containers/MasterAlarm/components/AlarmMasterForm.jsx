import React, {Component}                 from 'react';
import {Field, reduxForm}                 from 'redux-form';
import PropTypes                          from 'prop-types';
import {Button, ButtonToolbar, Col, Row}  from 'reactstrap';
import {renderField}                      from "../../../shared/components/form/InputField";
import DataTable                          from "../../../shared/components/data_table/DataTable";
import {FontAwesomeIcon}                  from "@fortawesome/react-fontawesome";
import {faCircle, faPlay}                 from '@fortawesome/free-solid-svg-icons';
import {ALARM_LIST_PROCESS, ASSEMBLY_API} from "../../../constants/constants";
import callAxios                          from "../../../services/api";
import LoadingSpinner                     from "../../../shared/components/loading_spinner/LoadingSpinner";
import {ALARM_MASTER_PAGE_CONSTANTS}      from "../constants";

class AlarmMasterForm extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		reset       : PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		let {field} = ALARM_MASTER_PAGE_CONSTANTS;
		this.state  = ({
			dataProcess: [],
			formData   : {
				[field.definitionValue]: '000',
			},
		});
	}

	callChildLoadProcess = (params) => {
		this.loadListProcess(params);
		//this.setDefinitionValue(params.definition_value, params.process_cd);
	};

	onModelArticleClick = (e, row) => {
		let {field} = ALARM_MASTER_PAGE_CONSTANTS;
		if (this.props.onMounted) {
			console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
		}

		row.getElement().style.backgroundColor = "#f00";


		let selectedRow = row._row.data;

		this.props.fillForm(selectedRow);

		let params = {
			model_cd  : selectedRow[field.modelCd],
			article_no: selectedRow[field.articleNo],
			resetForm : true
		};

		//this.resetFieldForm();
		this.loadListProcess(params);
	};

	resetFieldForm = () => {
		let {field} = ALARM_MASTER_PAGE_CONSTANTS;
		this.setState({
			formData: {
				...this.state.formData,
				[field.processCd]: '',

				[field.tempStandardFrom]: '',
				[field.tempStandardTo]  : '',
				[field.tempYellowFirst] : '',
				[field.tempYellowLast]  : '',
				[field.tempRedFirst]    : '',
				[field.tempRedLast]     : '',

				[field.presStandardFrom]: '',
				[field.presStandardTo]  : '',
				[field.presYellowFirst] : '',
				[field.presYellowLast]  : '',
				[field.presRedFirst]    : '',
				[field.presRedLast]     : '',

				[field.curStandardFrom]: '',
				[field.curStandardTo]  : '',
				[field.curYellowFirst] : '',
				[field.curYellowLast]  : '',
				[field.curRedFirst]    : '',
				[field.curRedLast]     : '',

				[field.remark]         : '',
				[field.definitionValue]: '000',
			},
		});
	};

	loadListProcess = (params) => {
		let method = 'POST';
		let url    = ASSEMBLY_API + ALARM_LIST_PROCESS;

		callAxios(method, url, params).then(response => {
			try {
				let {field}       = ALARM_MASTER_PAGE_CONSTANTS;
				let responseArray = response.data.data;
				let dataArray     = [];
				responseArray.map(item => {
					item = {
						[field.processCd]      : item.code.toString(),
						[field.processNm]      : item.name.toString(),
						[field.definitionValue]: item.definition_value.toString(),
					};
					dataArray.push(item);
				});

				this.setState({
					dataProcess: dataArray,
				});
			} catch (e) {
				console.log("Error: ", e);
			}
		});
		if (params.resetForm) {
			this.resetFieldForm();
		}
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.formData !== prevProps.formData) {
			this.setState({
				formData: this.props.formData,
				editMode: this.props.editMode,
			});
		}

		//When click row in the below table, have to dispatch value so that submit receives values
		let {field}    = ALARM_MASTER_PAGE_CONSTANTS;
		let {formData} = this.state;

		let temp_standard_from = formData[field.tempStandardFrom] ? formData[field.tempStandardFrom] : '';
		let temp_standard_to   = formData[field.tempStandardTo] ? formData[field.tempStandardTo] : '';
		let temp_yellow_first  = formData[field.tempYellowFirst] ? formData[field.tempYellowFirst] : '';
		let temp_yellow_last   = formData[field.tempYellowLast] ? formData[field.tempYellowLast] : '';
		let temp_red_first     = formData[field.tempRedFirst] ? formData[field.tempRedFirst] : '';
		let temp_red_last      = formData[field.tempRedLast] ? formData[field.tempRedLast] : '';

		let pres_standard_from = formData[field.presStandardFrom] ? formData[field.presStandardFrom] : '';
		let pres_standard_to   = formData[field.presStandardTo] ? formData[field.presStandardTo] : '';
		let pres_yellow_first  = formData[field.presYellowFirst] ? formData[field.presYellowFirst] : '';
		let pres_yellow_last   = formData[field.presYellowLast] ? formData[field.presYellowLast] : '';
		let pres_red_first     = formData[field.presRedFirst] ? formData[field.presRedFirst] : '';
		let pres_red_last      = formData[field.presRedLast] ? formData[field.presRedLast] : '';

		let cur_standard_from = formData[field.curStandardFrom] ? formData[field.curStandardFrom] : '';
		let cur_standard_to   = formData[field.curStandardTo] ? formData[field.curStandardTo] : '';
		let cur_yellow_first  = formData[field.curYellowFirst] ? formData[field.curYellowFirst] : '';
		let cur_yellow_last   = formData[field.curYellowLast] ? formData[field.curYellowLast] : '';
		let cur_red_first     = formData[field.curRedFirst] ? formData[field.curRedFirst] : '';
		let cur_red_last      = formData[field.curRedLast] ? formData[field.curRedLast] : '';

		let remark          = formData[field.remark] ? formData[field.remark] : '';
		let definitionValue = formData[field.definitionValue] ? formData[field.definitionValue] : '000';

		this.props.change(field.tempStandardFrom, temp_standard_from);
		this.props.change(field.tempStandardTo, temp_standard_to);
		this.props.change(field.tempYellowFirst, temp_yellow_first);
		this.props.change(field.tempYellowLast, temp_yellow_last);
		this.props.change(field.tempRedFirst, temp_red_first);
		this.props.change(field.tempRedLast, temp_red_last);

		this.props.change(field.presStandardFrom, pres_standard_from);
		this.props.change(field.presStandardTo, pres_standard_to);
		this.props.change(field.presYellowFirst, pres_yellow_first);
		this.props.change(field.presYellowLast, pres_yellow_last);
		this.props.change(field.presRedFirst, pres_red_first);
		this.props.change(field.presRedLast, pres_red_last);

		this.props.change(field.curStandardFrom, cur_standard_from);
		this.props.change(field.curStandardTo, cur_standard_to);
		this.props.change(field.curYellowFirst, cur_yellow_first);
		this.props.change(field.curYellowLast, cur_yellow_last);
		this.props.change(field.curRedFirst, cur_red_first);
		this.props.change(field.curRedLast, cur_red_last);

		this.props.change(field.remark, remark);
		this.props.change(field.definitionValue, definitionValue);
	}

	onClickProcess = (row) => {
		let selectedProcessCode = row.target.value;

		let {field}       = ALARM_MASTER_PAGE_CONSTANTS;
		let {dataProcess} = this.state;
		dataProcess.some(item => {
			if (item[field.processCd] == selectedProcessCode) {
				this.props.change(field.definitionValue, item[field.definitionValue]);

				this.setState({
					editMode: false,
					formData: {
						...this.state.formData,
						[field.processCd]      : selectedProcessCode,
						[field.definitionValue]: item[field.definitionValue],
					},
				});
				this.props.setSelectedProcess(selectedProcessCode, item[field.definitionValue]);
				return true;
			}
			return false;
		});
	};

	setDefinitionValue = (definitionValue, selectedProcessCode) => {
		let {field} = ALARM_MASTER_PAGE_CONSTANTS;
		this.props.change(field.definitionValue, definitionValue);
		this.setState({
			formData: {
				...this.state.formData,
				[field.processCd]      : selectedProcessCode,
				[field.definitionValue]: definitionValue,
			},
		});
	};

	render() {
		let {field} = ALARM_MASTER_PAGE_CONSTANTS;

		let {handleSubmit, columnsModelArticle, dataModelArticle, onReset, submissionState} = this.props;
		let {formData, dataProcess}                                                         = this.state;

		let definitionArray     = formData[field.definitionValue].split("");
		let temperatureDisabled = parseInt(definitionArray[0]) === 0;
		let pressureDisabled    = parseInt(definitionArray[1]) === 0;
		let curingTimeDisabled  = parseInt(definitionArray[2]) === 0;

		return (
			<div style={{display: "flex"}}>
				<Col md={3} lg={3} style={{minHeight: 300}}>
					<DataTable columns={columnsModelArticle} data={dataModelArticle} options={{
						height: "500px",
						border: "none",
					}} onRowClick={this.onModelArticleClick}/>
				</Col>
				<Col md={2} lg={2} style={{marginLeft: -30, backgroundColor: '#1A2439'}}>
					<div style={{display: "flex", flexDirection: "column"}}>
						<span className="form__form-group-label text-uppercase"
						      style={{paddingTop: 30, paddingLeft: 20, minHeight: 80}}>Process</span>
						<ul className="list-group bg-transparent" style={{width: "100%"}} onClick={this.onClickProcess}>
							{
								dataProcess.map(item => {
									let itemClass = (item[field.processCd] == formData[field.processCd])
									                ? 'list-group-item border-0 selected-process-code'
									                : 'list-group-item border-0 not-selected-process-code';
									let innerData = (item[field.processCd] == formData[field.processCd])
									                ? <div className={"d-flex"}>
										                <div style={{width: '90%'}}>{item[field.processNm]}</div>
										                <div>
											                <FontAwesomeIcon style={{
												                color      : 'rgba(255, 255, 255, 0.54)',
												                fontSize   : 8,
												                justifySelf: "flex-end"
											                }} icon={faPlay}/>
										                </div>
									                </div>
									                : item[field.processNm];
									return <li className={itemClass} key={item[field.processCd]}
									           value={item[field.processCd]}>{innerData}</li>;
								})
							}
						</ul>
					</div>
				</Col>
				<Col md={7} lg={7} style={{backgroundColor: '#1E2229'}}>
					<form className="form form--horizontal" onSubmit={handleSubmit}>
						<Col md={6} lg={6}>
							<div className="form__form-group">
								<span className="form__form-group-label">Model</span>
								<div className="form__form-group-field">
									<Field
										name={field.modelNm}
										component="input"
										type="text"
										props={{
											disabled: true,
											value   : formData[field.modelNm] ? formData[field.modelNm] : ''
										}}
										className={"marginLeft-20"}
									/>
								</div>
							</div>
						</Col>
						<Col md={6} lg={6}>
							<div className="form__form-group">
								<span className="form__form-group-label">Article</span>
								<div className="form__form-group-field">
									<Field
										name={field.articleNm}
										component="input"
										type="text"
										props={{
											disabled: true,
											value   : formData[field.articleNm] ? formData[field.articleNm] : ''
										}}
									/>
								</div>
							</div>
						</Col>

						<Col md={3} lg={3}>
						</Col>
						<Col md={3} lg={3}>
							<span className="form__form-group-label text-center text-uppercase">Temperature</span>
						</Col>
						<Col md={3} lg={3}>
							<span className="form__form-group-label text-center text-uppercase">Pressure</span>
						</Col>
						<Col md={3} lg={3}>
							<span className="form__form-group-label text-center text-uppercase">Curing Time</span>
						</Col>

						<hr style={{height: 30}}/>
						<Col md={3} lg={3}>
							<span className="form__form-group-label"><FontAwesomeIcon
								style={{color: '#03CF65', fontSize: 8}} icon={faCircle}/> Standard Value</span>
						</Col>
						<Col md={3} lg={3}>
							<Row>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">From</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.tempStandardFrom}
										component={renderField}
										type="text"
										props={{
											disabled: temperatureDisabled,
											value   : formData[field.tempStandardFrom]
											          ? formData[field.tempStandardFrom]
											          : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.tempStandardFrom]: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.tempStandardTo}
										component={renderField}
										type="text"
										props={{
											disabled: temperatureDisabled,
											value   : formData[field.tempStandardTo]
											          ? formData[field.tempStandardTo]
											          : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.tempStandardTo]: e.target.value,
											}
										})}
									/>
								</Col>
							</Row>
						</Col>
						<Col md={3} lg={3}>
							<Row>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">From</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.presStandardFrom}
										component={renderField}
										type="text"
										props={{
											disabled: pressureDisabled,
											value   : formData[field.presStandardFrom]
											          ? formData[field.presStandardFrom]
											          : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.presStandardFrom]: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.presStandardTo}
										component={renderField}
										type="text"
										props={{
											disabled: pressureDisabled,
											value   : formData[field.presStandardTo]
											          ? formData[field.presStandardTo]
											          : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.presStandardTo]: e.target.value,
											}
										})}
									/>
								</Col>
							</Row>
						</Col>
						<Col md={3} lg={3}>
							<Row>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">From</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.curStandardFrom}
										component={renderField}
										type="text"
										props={{
											disabled: curingTimeDisabled,
											value   : formData[field.curStandardFrom]
											          ? formData[field.curStandardFrom]
											          : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.curStandardFrom]: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.curStandardTo}
										component={renderField}
										type="text"
										props={{
											disabled: curingTimeDisabled,
											value   : formData[field.curStandardTo] ? formData[field.curStandardTo] : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.curStandardTo]: e.target.value,
											}
										})}
									/>
								</Col>
							</Row>
						</Col>

						<hr style={{height: 30}}/>
						<Col md={3} lg={3}>
							<span className="form__form-group-label"><FontAwesomeIcon
								style={{color: '#FFD44F', fontSize: 8}} icon={faCircle}/> Yellow Range</span>
						</Col>
						<Col md={3} lg={3}>
							<Row>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">From</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.tempYellowFirst}
										component={renderField}
										type="text"
										props={{
											disabled: temperatureDisabled,
											value   : formData[field.tempYellowFirst]
											          ? formData[field.tempYellowFirst]
											          : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.tempYellowFirst]: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.tempYellowLast}
										component={renderField}
										type="text"
										props={{
											disabled: temperatureDisabled,
											value   : formData[field.tempYellowLast]
											          ? formData[field.tempYellowLast]
											          : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.tempYellowLast]: e.target.value,
											}
										})}
									/>
								</Col>
							</Row>
						</Col>
						<Col md={3} lg={3}>
							<Row>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">From</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.presYellowFirst}
										component={renderField}
										type="text"
										props={{
											disabled: pressureDisabled,
											value   : formData[field.presYellowFirst]
											          ? formData[field.presYellowFirst]
											          : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.presYellowFirst]: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.presYellowLast}
										component={renderField}
										type="text"
										props={{
											disabled: pressureDisabled,
											value   : formData[field.presYellowLast]
											          ? formData[field.presYellowLast]
											          : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.presYellowLast]: e.target.value,
											}
										})}
									/>
								</Col>
							</Row>
						</Col>
						<Col md={3} lg={3}>
							<Row>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">From</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.curYellowFirst}
										component={renderField}
										type="text"
										props={{
											disabled: curingTimeDisabled,
											value   : formData[field.curYellowFirst]
											          ? formData[field.curYellowFirst]
											          : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.curYellowFirst]: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.curYellowLast}
										component={renderField}
										type="text"
										props={{
											disabled: curingTimeDisabled,
											value   : formData[field.curYellowLast] ? formData[field.curYellowLast] : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.curYellowLast]: e.target.value,
											}
										})}
									/>
								</Col>
							</Row>
						</Col>

						<hr style={{height: 30}}/>
						<Col md={3} lg={3}>
							<span className="form__form-group-label"><FontAwesomeIcon
								style={{color: '#F84E4E', fontSize: 8}} icon={faCircle}/> Red Range</span>
						</Col>
						<Col md={3} lg={3}>
							<Row>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">From</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.tempRedFirst}
										component={renderField}
										type="text"
										props={{
											disabled: temperatureDisabled,
											value   : formData[field.tempRedFirst] ? formData[field.tempRedFirst] : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.tempRedFirst]: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.tempRedLast}
										component={renderField}
										type="text"
										props={{
											disabled: temperatureDisabled,
											value   : formData[field.tempRedLast] ? formData[field.tempRedLast] : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.tempRedLast]: e.target.value,
											}
										})}
									/>
								</Col>
							</Row>
						</Col>
						<Col md={3} lg={3}>
							<Row>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">From</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.presRedFirst}
										component={renderField}
										type="text"
										props={{
											disabled: pressureDisabled,
											value   : formData[field.presRedFirst] ? formData[field.presRedFirst] : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.presRedFirst]: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.presRedLast}
										component={renderField}
										type="text"
										props={{
											disabled: pressureDisabled,
											value   : formData[field.presRedLast] ? formData[field.presRedLast] : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.presRedLast]: e.target.value,
											}
										})}
									/>
								</Col>
							</Row>
						</Col>
						<Col md={3} lg={3}>
							<Row>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">From</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.curRedFirst}
										component={renderField}
										type="text"
										props={{
											disabled: curingTimeDisabled,
											value   : formData[field.curRedFirst] ? formData[field.curRedFirst] : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.curRedFirst]: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name={field.curRedLast}
										component={renderField}
										type="text"
										props={{
											disabled: curingTimeDisabled,
											value   : formData[field.curRedLast] ? formData[field.curRedLast] : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												[field.curRedLast]: e.target.value,
											}
										})}
									/>
								</Col>
							</Row>
						</Col>

						<hr style={{height: 30}}/>
						<Col md={4} lg={4}>
						</Col>
						<Col md={8} lg={8} style={{marginLeft: -80}}>
							<Field
								name={field.remark}
								component={renderField}
								type="text"
								placeholder="Remark"
								props={{
									value: formData[field.remark] ? formData[field.remark] : ''
								}}
								onChange={e => this.setState({
									formData: {
										...formData,
										[field.remark]: e.target.value,
									}
								})}
							/>
							<Field
								name={field.definitionValue}
								component={renderField}
								props={{
									value: formData[field.definitionValue] ? formData[field.definitionValue] : ''
								}}
								type="hidden"
								onChange={e => this.setState({
									formData: {
										...formData,
										[field.definitionValue]: e.target.value,
									}
								})}
							/>
						</Col>

						<hr style={{height: 30}}/>
						<Col md={12} lg={12} style={{display: 'flex', justifyItems: 'flex-end'}}>
							<ButtonToolbar className="form__button-toolbar">
								<Button color="primary" type="submit">
									{(() => {
										let {initial, onGoing, done} = ALARM_MASTER_PAGE_CONSTANTS.submissionState;
										if (this.state.editMode) {
											switch (submissionState) {
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
									})()}
									{
										submissionState === ALARM_MASTER_PAGE_CONSTANTS.submissionState.onGoing
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
							</ButtonToolbar>
						</Col>
					</form>
				</Col>
			</div>
		);
	}
}

export default reduxForm({
	form: ALARM_MASTER_PAGE_CONSTANTS.alarmMasterFormName,
})(AlarmMasterForm);
