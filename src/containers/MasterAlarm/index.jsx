import React, {Component}                                from 'react';
import {Col, Container, Row}                             from 'reactstrap';
import AlarmMasterForm                                   from "./components/AlarmMasterForm";
import {reduxForm}                                       from "redux-form";
import DataTable                                         from "../../shared/components/data_table/DataTable";
import {ALARM_MODEL_ARTICLE, ALARM_SENSOR, ASSEMBLY_API} from "../../constants/constants";
import callAxios                                         from "../../services/api";
import {
	ALARM_MASTER_PAGE_CONSTANTS,
	alarmSensorTableColumns,
	defaultAlarmSensorTableData,
	defaultModelArticleTableData,
	modelArticleTableColumns
}                                                        from "./constants";

class MasterAlarm extends Component {
	constructor(props) {
		super(props);

		let {initial} = ALARM_MASTER_PAGE_CONSTANTS.submissionState;

		this.child = React.createRef();

		this.state = {
			columnsModelArticle: modelArticleTableColumns,
			dataModelArticle   : defaultModelArticleTableData,
			columnsAlarmSensor : alarmSensorTableColumns,
			dataAlarmSensor    : defaultAlarmSensorTableData,
			formData           : {},
			editMode           : false,
			submissionState    : initial,    // -1: Submit/Save, 0: Submitting/Saving, 1: Submitted/Saved
		};
	}

	loadListModelArticle = () => {
		let method  = 'POST';
		let url     = ASSEMBLY_API + ALARM_MODEL_ARTICLE;
		let params  = {
			"value_yn": 0
		};
		let {field} = ALARM_MASTER_PAGE_CONSTANTS;

		callAxios(method, url, params).then(response => {
			try {
				let responseArray = response.data.data;
				let dataArray     = [];

				responseArray.map(item => {
					item = {
						[field.modelNm]  : item.model_nm.toString(),
						[field.modelCd]  : item.model_cd.toString(),
						[field.articleNm]: item.article_nm.toString(),
						[field.articleNo]: item.article_no.toString(),
					};
					dataArray.push(item);
				});
				this.setState({
					dataModelArticle: dataArray,
				});
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	};

	fillForm = (selectedRow) => {
		let {field} = ALARM_MASTER_PAGE_CONSTANTS;
		this.setState({
			formData       : {
				...this.state.formData,
				[field.modelNm]        : selectedRow[field.modelNm],
				[field.modelCd]        : selectedRow[field.modelCd],
				[field.articleNm]      : selectedRow[field.articleNm],
				[field.articleNo]      : selectedRow[field.articleNo],
				[field.definitionValue]: '000',
			},
			editMode       : false,
			submissionState: ALARM_MASTER_PAGE_CONSTANTS.submissionState.initial,
		});
	};

	loadListAlarmSensor = () => {
		let method  = 'POST';
		let url     = ASSEMBLY_API + ALARM_SENSOR;
		let {field} = ALARM_MASTER_PAGE_CONSTANTS;

		callAxios(method, url, {}).then(response => {
			try {
				let responseArray = response.data.data;
				let dataArray     = [];

				responseArray.map(item => {
					item = {
						[field.modelNm]  : item.model_nm ? item.model_nm : '0',
						[field.modelCd]  : item.model_cd ? item.model_cd : '0',
						[field.articleNm]: item.article_nm ? item.article_nm : '0',
						[field.articleNo]: item.article_no ? item.article_no : '0',
						[field.processNm]: item.process_nm ? item.process_nm : '0',
						[field.processCd]: item.process_cd ? item.process_cd : '0',

						[field.tempStandard]: `${item.temp_standard_from} \u279c ${item.temp_standard_to}`,
						[field.tempYellow]  : `${item.temp_yellow_first} \u279c ${item.temp_yellow_last}`,
						[field.tempRed]     : `${item.temp_red_first} \u279c ${item.temp_red_last}`,
						[field.presStandard]: `${item.pres_standard_from} \u279c ${item.pres_standard_to}`,
						[field.presYellow]  : `${item.pres_yellow_first} \u279c ${item.pres_yellow_last}`,
						[field.presRed]     : `${item.pres_red_first} \u279c ${item.pres_red_last}`,
						[field.curStandard] : `${item.cur_standard_from} \u279c ${item.cur_standard_to}`,
						[field.curYellow]   : `${item.cur_yellow_first} \u279c ${item.cur_yellow_last}`,
						[field.curRed]      : `${item.cur_red_first} \u279c ${item.cur_red_last}`,

						[field.tempStandardFrom]: item.temp_standard_from,
						[field.tempStandardTo]  : item.temp_standard_to,
						[field.tempYellowFirst] : item.temp_yellow_first,
						[field.tempYellowLast]  : item.temp_yellow_last,
						[field.tempRedFirst]    : item.temp_red_first,
						[field.tempRedLast]     : item.temp_red_last,
						[field.presStandardFrom]: item.pres_standard_from,
						[field.presStandardTo]  : item.pres_standard_to,
						[field.presYellowFirst] : item.pres_yellow_first,
						[field.presYellowLast]  : item.pres_yellow_last,
						[field.presRedFirst]    : item.pres_red_first,
						[field.presRedLast]     : item.pres_red_last,
						[field.curStandardFrom] : item.cur_standard_from,
						[field.curStandardTo]   : item.cur_standard_to,
						[field.curYellowFirst]  : item.cur_yellow_first,
						[field.curYellowLast]   : item.cur_yellow_last,
						[field.curRedFirst]     : item.cur_red_first,
						[field.curRedLast]      : item.cur_red_last,

						[field.definitionValue]: item.definition_value,
					};
					dataArray.push(item);
				});
				this.setState({
					dataAlarmSensor: dataArray,
				});
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	};

	componentDidMount() {
		this.loadListModelArticle();
		this.loadListAlarmSensor();
	}

	handleSubmit = (values) => {
		let {initial, onGoing, done} = ALARM_MASTER_PAGE_CONSTANTS.submissionState;

		this.setState({
			submissionState: onGoing,
		});
		let {field} = ALARM_MASTER_PAGE_CONSTANTS;

		let definitionValue = values[field.definitionValue];
		let formData        = this.state.formData;
		let method          = 'POST';
		let url             = '/api/asc/masalarmsensor';
		for (let i = 0; i < definitionValue.length; i++) {
			if (definitionValue[i] > 0) {
				let standard_from = 0;
				let standard_to   = 0;
				let yellow_first  = 0;
				let yellow_last   = 0;
				let red_first     = 0;
				let red_last      = 0;
				let sensor_type   = i + 1;
				if (sensor_type == 1) {
					standard_from = values[field.tempStandardFrom];
					standard_to   = values[field.tempStandardTo];
					yellow_first  = values[field.tempYellowFirst];
					yellow_last   = values[field.tempYellowLast];
					red_first     = values[field.tempRedFirst];
					red_last      = values[field.tempRedLast];
				} else if (sensor_type == 2) {
					standard_from = values[field.presStandardFrom];
					standard_to   = values[field.presStandardTo];
					yellow_first  = values[field.presYellowFirst];
					yellow_last   = values[field.presYellowLast];
					red_first     = values[field.presRedFirst];
					red_last      = values[field.presRedLast];
				} else if (sensor_type == 3) {
					standard_from = values[field.curStandardFrom];
					standard_to   = values[field.curStandardTo];
					yellow_first  = values[field.curYellowFirst];
					yellow_last   = values[field.curYellowLast];
					red_first     = values[field.curRedFirst];
					red_last      = values[field.curRedLast];
				}
				let param = {
					"status"       : this.state.editMode ? "UPDATE" : "INSERT",
					"model_cd"     : formData[field.modelCd],
					"article_no"   : formData[field.articleNo],
					"process_cd"   : formData[field.processCd],
					"sensor_type"  : sensor_type,   //1: temp, 2: pressure, 3: curing time
					"standard_from": standard_from,
					"standard_to"  : standard_to,
					"yellow_first" : yellow_first,
					"yellow_last"  : yellow_last,
					"red_first"    : red_first,
					"red_last"     : red_last,
					"time_first"   : '0',
					"time_last"    : '0',
					"remark"       : values[field.remark] ? values[field.remark] : '',
					"username"     : "truongho"
				};
				callAxios(method, url, param).then(response => {
					//Update parent combobox items
					try {
						if (response.status == 200) {
							this.loadListAlarmSensor();
							this.loadListModelArticle();

							//reload process loading
							this.child.ref.current.wrapped.current.callChildLoadProcess({
								model_cd  : formData[field.modelCd],
								article_no: formData[field.articleNo],
							});
							this.setState({
								submissionState: done,
							});
							setTimeout(() => {
								if (!this.state.editMode) {
									this.setState({
										formData: {
											...this.state.formData,
											[field.tempStandardFrom]: values[field.tempStandardFrom],
											[field.tempStandardTo]  : values[field.tempStandardTo],
											[field.tempYellowFirst] : values[field.tempYellowFirst],
											[field.tempYellowLast]  : values[field.tempYellowLast],
											[field.tempRedFirst]    : values[field.tempRedFirst],
											[field.tempRedLast]     : values[field.tempRedLast],
											[field.presStandardFrom]: values[field.presStandardFrom],
											[field.presStandardTo]  : values[field.presStandardTo],
											[field.presYellowFirst] : values[field.presYellowFirst],
											[field.presYellowLast]  : values[field.presYellowLast],
											[field.presRedFirst]    : values[field.presRedFirst],
											[field.presRedLast]     : values[field.presRedLast],
											[field.curStandardFrom] : values[field.curStandardFrom],
											[field.curStandardTo]   : values[field.curStandardTo],
											[field.curYellowFirst]  : values[field.curYellowFirst],
											[field.curYellowLast]   : values[field.curYellowLast],
											[field.curRedFirst]     : values[field.curRedFirst],
											[field.curRedLast]      : values[field.curRedLast],
											[field.remark]          : values[field.remark],
											[field.definitionValue] : values[field.definitionValue],
										},
									});
								}
								this.setState({
									submissionState: initial,
									editMode       : false,
								});
							}, 1000);
						}
					} catch (e) {
						console.log("Error: ", e);
					}
				});
			}
		}

		event.preventDefault();
	};

	setSelectedProcess = (processCode, definitionValue) => {
		let {field} = ALARM_MASTER_PAGE_CONSTANTS;
		this.setState({
			editMode: false,
			formData: {
				...this.state.formData,
				[field.processCd]       : processCode,
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
				[field.curStandardFrom] : '',
				[field.curStandardTo]   : '',
				[field.curYellowFirst]  : '',
				[field.curYellowLast]   : '',
				[field.curRedFirst]     : '',
				[field.curRedLast]      : '',
				[field.definitionValue] : definitionValue,
			},
		});
	};

	onAlarmSensorTableRowClick = (e, row) => {
		let {field, submissionState} = ALARM_MASTER_PAGE_CONSTANTS;
		let selectedRow              = row._row.data;
		this.setState({
			editMode       : true,
			submissionState: submissionState.initial,
			formData       : {
				...this.state.formData,
				[field.modelNm]         : selectedRow[field.modelNm],
				[field.modelCd]         : selectedRow[field.modelCd],
				[field.articleNo]       : selectedRow[field.articleNo],
				[field.articleNm]       : selectedRow[field.articleNm],
				[field.processNm]       : selectedRow[field.processNm],
				[field.processCd]       : selectedRow[field.processCd],
				[field.tempStandardFrom]: selectedRow[field.tempStandardFrom],
				[field.tempStandardTo]  : selectedRow[field.tempStandardTo],
				[field.tempYellowFirst] : selectedRow[field.tempYellowFirst],
				[field.tempYellowLast]  : selectedRow[field.tempYellowLast],
				[field.tempRedFirst]    : selectedRow[field.tempRedFirst],
				[field.tempRedLast]     : selectedRow[field.tempRedLast],
				[field.presStandardFrom]: selectedRow[field.presStandardFrom],
				[field.presStandardTo]  : selectedRow[field.presStandardTo],
				[field.presYellowFirst] : selectedRow[field.presYellowFirst],
				[field.presYellowLast]  : selectedRow[field.presYellowLast],
				[field.presRedFirst]    : selectedRow[field.presRedFirst],
				[field.presRedLast]     : selectedRow[field.presRedLast],
				[field.curStandardFrom] : selectedRow[field.curStandardFrom],
				[field.curStandardTo]   : selectedRow[field.curStandardTo],
				[field.curYellowFirst]  : selectedRow[field.curYellowFirst],
				[field.curYellowLast]   : selectedRow[field.curYellowLast],
				[field.curRedFirst]     : selectedRow[field.curRedFirst],
				[field.curRedLast]      : selectedRow[field.curRedLast],
				[field.definitionValue] : selectedRow[field.definitionValue],
			}
		});
		let params = {
			model_cd        : selectedRow[field.modelCd],
			article_no      : selectedRow[field.articleNo],
			definition_value: selectedRow[field.definitionValue],
			process_cd      : selectedRow[field.processCd],
		};
		this.child.ref.current.wrapped.current.callChildLoadProcess(params);
		this.child.ref.current.wrapped.current.setDefinitionValue(params.definition_value, params.process_cd);
	};

	onReset = () => {
		this.setState({
			formData: {},
			editMode: false,
		});
	};

	render() {
		let {columnsModelArticle, dataModelArticle, columnsAlarmSensor, dataAlarmSensor, formData, submissionState, editMode} = this.state;
		return (
			<Container className="dashboard">
				<Row>
					<AlarmMasterForm columnsModelArticle={columnsModelArticle}
					                 dataModelArticle={dataModelArticle}
					                 fillForm={this.fillForm}
					                 formData={formData}
					                 onSubmit={this.handleSubmit}
					                 setSelectedProcess={this.setSelectedProcess}
					                 ref={(node) => {
						                 this.child = node;
					                 }}
					                 onReset={this.onReset}
					                 editMode={editMode}
					                 submissionState={submissionState}
					/>
				</Row>
				<Row style={{marginTop: 50}}>
					<Col md={12} lg={12}>
						<DataTable columns={columnsAlarmSensor} data={dataAlarmSensor}
						           options={{
							           height         : "40em",
							           columnVertAlign: "bottom"
						           }}
						           onRowClick={this.onAlarmSensorTableRowClick}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default reduxForm({
	form: ALARM_MASTER_PAGE_CONSTANTS.alarmMasterFormName,
})(MasterAlarm);
