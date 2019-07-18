import React, {Component} from 'react';
import {change, Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, Container, Col, Row, ButtonToolbar} from 'reactstrap';
import {renderField} from "../../../shared/components/form/InputField";
import DataTable from "../../../shared/components/data_table/DataTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircle, faPlay } from '@fortawesome/free-solid-svg-icons'
import {ASSEMBLY_API, ALARM_LIST_PROCESS} from "../../../constants/constants";
import callAxios from "../../../services/api";
import {MASTER_FORM_CONSTANTS} from "../../MasterPage/components/MasterForm";
import LoadingSpinner from "../../../shared/components/loading_spinner/LoadingSpinner";

class AlarmMasterForm extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		reset: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = ({
			dataProcess: [],
			formData: {},
			selectedDefinition: [true, true, true],
		});
	}

	callChildLoadProcess = (params) => {
		this.loadListProcess(params);
		//this.setDefinitionValue(params.definition_value, params.process_cd);
	}

	onModelArticleClick = (e, row) => {
		if (this.props.onMounted){
			console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
		}

		row.getElement().style.backgroundColor = "#f00";


		let selectedRow = row._row.data;

		this.props.fillForm(selectedRow);

		let params = {
			model_cd: selectedRow.model_cd,
			article_no: selectedRow.article_no,
			resetForm: true
		};

		//this.resetFieldForm();
		this.loadListProcess(params);
	};

	resetFieldForm = () => {
		let formData = this.state.formData;
		this.setState({
			...formData,
			definition_value:'000',
			temp_standard_from: '',
			temp_standard_to: '',
			temp_yellow_first: '',
			temp_yellow_last: '',
			temp_red_first: '',
			temp_red_last: '',
			pres_standard_from: '',
			pres_standard_to: '',
			pres_yellow_first: '',
			pres_yellow_last: '',
			pres_red_first: '',
			pres_red_last: '',
			curr_standard_from: '',
			curr_standard_to: '',
			curr_yellow_first: '',
			curr_yellow_last: '',
			curr_red_first: '',
			curr_red_last: '',
		});
	}

	loadListProcess = (params) => {
		let method = 'POST';
		let url = ASSEMBLY_API + ALARM_LIST_PROCESS;

		callAxios(method, url, params).then(response => {
			try {
				let responseArray = response.data.data;
				let dataArray = [];
				responseArray.map(item => {
					item = {
						code: item.code.toString(),
						name: item.name.toString(),
						definition_value: item.definition_value.toString(),
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
		if (params.resetForm){
			this.resetFieldForm();
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.formData !== prevProps.formData) {
			this.setState({
				formData: this.props.formData,
				editMode: this.props.editMode,
			});
		}

		//When click row in the below table, have to dispatch value so that submit receives values
		let {formData} = this.state;

		let temp_standard_from  = formData.temp_standard_from   ? formData.temp_standard_from  :'';
		let temp_standard_to    = formData.temp_standard_to     ? formData.temp_standard_to    :'';
		let temp_yellow_first   = formData.temp_yellow_first    ? formData.temp_yellow_first   :'';
		let temp_yellow_last    = formData.temp_yellow_last     ? formData.temp_yellow_last    :'';
		let temp_red_first      = formData.temp_red_first       ? formData.temp_red_first      :'';
		let temp_red_last       = formData.temp_red_last        ? formData.temp_red_last       :'';

		let pres_standard_from  = formData.pres_standard_from   ? formData.pres_standard_from  :'';
		let pres_standard_to    = formData.pres_standard_to     ? formData.pres_standard_to    :'';
		let pres_yellow_first   = formData.pres_yellow_first    ? formData.pres_yellow_first   :'';
		let pres_yellow_last    = formData.pres_yellow_last     ? formData.pres_yellow_last    :'';
		let pres_red_first      = formData.pres_red_first       ? formData.pres_red_first      :'';
		let pres_red_last       = formData.pres_red_last        ? formData.pres_red_last       :'';

		let curr_standard_from  = formData.curr_standard_from   ? formData.curr_standard_from  :'';
		let curr_standard_to    = formData.curr_standard_to     ? formData.curr_standard_to    :'';
		let curr_yellow_first   = formData.curr_yellow_first    ? formData.curr_yellow_first   :'';
		let curr_yellow_last    = formData.curr_yellow_last     ? formData.curr_yellow_last    :'';
		let curr_red_first      = formData.curr_red_first       ? formData.curr_red_first      :'';
		let curr_red_last       = formData.curr_red_last        ? formData.curr_red_last       :'';

		let remark = formData.remark ? formData.remark:'';

		this.props.dispatch(change("AlarmMasterForm", 'temp_standard_from', temp_standard_from));
		this.props.dispatch(change("AlarmMasterForm", 'temp_standard_to',   temp_standard_to));
		this.props.dispatch(change("AlarmMasterForm", 'temp_yellow_first',  temp_yellow_first));
		this.props.dispatch(change("AlarmMasterForm", 'temp_yellow_last',   temp_yellow_last));
		this.props.dispatch(change("AlarmMasterForm", 'temp_red_first',      temp_red_first));
		this.props.dispatch(change("AlarmMasterForm", 'temp_red_last',        temp_red_last));

		this.props.dispatch(change("AlarmMasterForm", 'pres_standard_from', pres_standard_from));
		this.props.dispatch(change("AlarmMasterForm", 'pres_standard_to',   pres_standard_to));
		this.props.dispatch(change("AlarmMasterForm", 'pres_yellow_first',  pres_yellow_first));
		this.props.dispatch(change("AlarmMasterForm", 'pres_yellow_last',   pres_yellow_last));
		this.props.dispatch(change("AlarmMasterForm", 'pres_red_first',      pres_red_first));
		this.props.dispatch(change("AlarmMasterForm", 'pres_red_last',        pres_red_last));

		this.props.dispatch(change("AlarmMasterForm", 'curr_standard_from',     curr_standard_from));
		this.props.dispatch(change("AlarmMasterForm", 'curr_standard_to',       curr_standard_to));
		this.props.dispatch(change("AlarmMasterForm", 'curr_yellow_first',      curr_yellow_first));
		this.props.dispatch(change("AlarmMasterForm", 'curr_yellow_last',       curr_yellow_last));
		this.props.dispatch(change("AlarmMasterForm", 'curr_red_first',         curr_red_first));
		this.props.dispatch(change("AlarmMasterForm", 'curr_red_last',          curr_red_last));
		this.props.dispatch(change("AlarmMasterForm", 'remark', remark));
	}

	onClickProcess = (row) => {
		let processCode = row.target.value;

		let {dataProcess} = this.state;
		let selectedDefinition = [true, true, true];
		dataProcess.map(item => {
			if (item.code == processCode){
				let definitionArray = item.definition_value.split("");
				let disableTemperature  = parseInt(definitionArray[0]) > 0?false:true;
				let disablePressure     = parseInt(definitionArray[1]) > 0?false:true;
				let disableCuringTime   = parseInt(definitionArray[2]) > 0?false:true;
				selectedDefinition = [disableTemperature, disablePressure, disableCuringTime];
			}
		});
		this.props.dispatch(change("AlarmMasterForm", "definition_value", selectedDefinition));

		this.setState({
			selectedProcessCode: processCode,
			selectedDefinition: selectedDefinition,
			editMode: false,
		});
		this.props.setSelectedProcess(processCode);
	}

	setDefinitionValue = (definitionValue, selectedCode) => {
		let definitionArray = definitionValue.split("");
		let disableTemperature  = parseInt(definitionArray[0]) > 0?false:true;
		let disablePressure     = parseInt(definitionArray[1]) > 0?false:true;
		let disableCuringTime   = parseInt(definitionArray[2]) > 0?false:true;
		let selectedDefinition = [disableTemperature, disablePressure, disableCuringTime];
		this.props.dispatch(change("AlarmMasterForm", "definition_value", selectedDefinition));
		this.setState({
			selectedProcessCode: selectedCode,
			selectedDefinition: selectedDefinition,
		});
	}

	render() {
		let {handleSubmit, columnsModelArticle, dataModelArticle, onReset, submissionState} = this.props;
		let {dataProcess, selectedProcessCode, selectedDefinition, editMode} = this.state;
		let {formData} = this.state;
		return (
			<div style={{display:"flex"}}>
				<Col md={3} lg={3} style={{minHeight: 300}}>
					<DataTable columns={columnsModelArticle} data={dataModelArticle} options={{
						height: "500px",
						border: "none",
					}} onRowClick={this.onModelArticleClick}/>
				</Col>
				<Col md={2} lg={2} style={{marginLeft: -30, backgroundColor: '#1A2439'}}>
					<div style={{display: "flex", flexDirection: "column"}}>
						<span className="form__form-group-label text-uppercase" style={{paddingTop: 30, paddingLeft: 20, minHeight: 80}}>Process</span>
						<ul className="list-group bg-transparent" style={{width:"100%"}} onClick={this.onClickProcess}>
							{
								dataProcess.map(item => {
									let itemClass = (item.code == selectedProcessCode)?'list-group-item border-0 selected-process-code':'list-group-item border-0 not-selected-process-code';
									let innerData = (item.code == selectedProcessCode)?<div className={"d-flex"}>
										<div style={{width: '90%'}}>{item.name}</div>
										<div>
											<FontAwesomeIcon style={{color: 'rgba(255, 255, 255,' +
													' 0.54)', fontSize: 8, justifySelf:"flex-end"}} icon={faPlay} />
										</div>

									</div>:item.name;
									return <li className={itemClass} key={item.code}
									           value={item.code}>{innerData}</li>
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
										name="model_nm"
										component="input"
										type="text"
										props={{
											disabled: true,
											value: formData.model_nm ? formData.model_nm:''
										}}
										className={"marginLeff-20"}
									/>
								</div>
							</div>
						</Col>
						<Col md={6} lg={6}>
							<div className="form__form-group">
								<span className="form__form-group-label">Article</span>
								<div className="form__form-group-field">
									<Field
										name="article_nm"
										component="input"
										type="text"
										props={{
											disabled: true,
											value: formData.article_nm ? formData.article_nm:''
										}}
									/>
								</div>
							</div>
						</Col>

						<Col md={3} lg={3}>
						</Col>
						<Col md={3} lg={3}>
							<span className="form__form-group-label text-center text-uppercase" >Temperature</span>
						</Col>
						<Col md={3} lg={3}>
							<span className="form__form-group-label text-center text-uppercase">Pressure</span>
						</Col>
						<Col md={3} lg={3}>
							<span className="form__form-group-label text-center text-uppercase">Curing Time</span>
						</Col>

						<hr style={{height: 30}}/>
						<Col md={3} lg={3}>
							<span className="form__form-group-label"><FontAwesomeIcon style={{color: '#03CF65', fontSize: 8}} icon={faCircle} /> Standard Value</span>
						</Col>
						<Col md={3} lg={3}>
							<Row>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">From</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name="temp_standard_from"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[0],
											value: formData.temp_standard_from ? formData.temp_standard_from : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												temp_standard_from: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name="temp_standard_to"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[0],
											value: formData.temp_standard_to ? formData.temp_standard_to : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												temp_standard_to: e.target.value,
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
										name="pres_standard_from"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[1],
											value: formData.pres_standard_from ? formData.pres_standard_from : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												pres_standard_from: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name="pres_standard_to"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[1],
											value: formData.pres_standard_to ? formData.pres_standard_to : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												pres_standard_to: e.target.value,
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
										name="curr_standard_from"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[2],
											value: formData.curr_standard_from ? formData.curr_standard_from : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												curr_standard_from: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name="curr_standard_to"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[2],
											value: formData.curr_standard_to ? formData.curr_standard_to : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												curr_standard_to: e.target.value,
											}
										})}
									/>
								</Col>
							</Row>
						</Col>

						<hr style={{height: 30}}/>
						<Col md={3} lg={3}>
							<span className="form__form-group-label"><FontAwesomeIcon style={{color: '#FFD44F', fontSize: 8}} icon={faCircle} /> Yellow Range</span>
						</Col>
						<Col md={3} lg={3}>
							<Row>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">From</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name="temp_yellow_first"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[0],
											value: formData.temp_yellow_first ? formData.temp_yellow_first : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												temp_yellow_first: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name="temp_yellow_last"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[0],
											value: formData.temp_yellow_last ? formData.temp_yellow_last : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												temp_yellow_last: e.target.value,
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
										name="pres_yellow_first"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[1],
											value: formData.pres_yellow_first ? formData.pres_yellow_first : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												pres_yellow_first: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name="pres_yellow_last"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[1],
											value: formData.pres_yellow_last ? formData.pres_yellow_last : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												pres_yellow_last: e.target.value,
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
										name="curr_yellow_first"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[2],
											value: formData.curr_yellow_first ? formData.curr_yellow_first : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												curr_yellow_first: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name="curr_yellow_last"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[2],
											value: formData.curr_yellow_last ? formData.curr_yellow_last : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												curr_yellow_last: e.target.value,
											}
										})}
									/>
								</Col>
							</Row>
						</Col>

						<hr style={{height: 30}}/>
						<Col md={3} lg={3}>
							<span className="form__form-group-label"><FontAwesomeIcon style={{color: '#F84E4E', fontSize: 8}} icon={faCircle} /> Red Range</span>
						</Col>
						<Col md={3} lg={3}>
							<Row>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">From</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name="temp_red_first"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[0],
											value: formData.temp_red_first ? formData.temp_red_first : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												temp_red_first: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name="temp_red_last"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[0],
											value: formData.temp_red_last ? formData.temp_red_last : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												temp_red_last: e.target.value,
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
										name="pres_red_first"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[1],
											value: formData.pres_red_first ? formData.pres_red_first : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												pres_red_first: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name="pres_red_last"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[1],
											value: formData.pres_red_last ? formData.pres_red_last : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												pres_red_last: e.target.value,
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
										name="curr_red_first"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[2],
											value: formData.curr_red_first ? formData.curr_red_first : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												curr_red_first: e.target.value,
											}
										})}
									/>
								</Col>
								<Col md={2} lg={2}>
									<span className="form__form-group-label">To</span>
								</Col>
								<Col md={4} lg={4}>
									<Field
										name="curr_red_last"
										component={renderField}
										type="text"
										props={{
											disabled: selectedDefinition[2],
											value: formData.curr_red_last ? formData.curr_red_last : ''
										}}
										onChange={e => this.setState({
											formData: {
												...formData,
												curr_red_last: e.target.value,
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
								name="remark"
								component={renderField}
								type="text"
								placeholder="Remark"
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
							<Field
								name="definition_value"
								component={renderField}
								props={{
									value: formData.definition_value ? formData.definition_value : ''
								}}
								type="hidden"
								onChange={e => this.setState({
									formData: {
										...formData,
										definition_value: e.target.value,
									}
								})}
							/>
						</Col>

						<hr style={{height: 30}}/>
						<Col md={12} lg={12} style={{display:'flex', justifyItems: 'flex-end'}}>
							<ButtonToolbar className="form__button-toolbar">
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
							</ButtonToolbar>
						</Col>
					</form>
				</Col>
			</div>
		);
	}
}

export default reduxForm({
	form: 'AlarmMasterForm',
})(AlarmMasterForm);
