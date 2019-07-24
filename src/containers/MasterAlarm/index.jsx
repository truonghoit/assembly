import React, {Component}                                from 'react';
import {Col, Container, Row}                             from 'reactstrap';
import AlarmMasterForm                                   from "./components/AlarmMasterForm";
import {reduxForm}                                       from "redux-form";
import DataTable                                         from "../../shared/components/data_table/DataTable";
import {ALARM_MODEL_ARTICLE, ALARM_SENSOR, ASSEMBLY_API} from "../../constants/constants";
import callAxios                                         from "../../services/api";
import {
	alarmSensorTableColumns,
	defaultAlarmSensorTableData,
	defaultModelArticleTableData,
	modelArticleTableColumns
}                                                        from "./constants";

class MasterAlarm extends Component {
	constructor(props) {
		super(props);

		this.child = React.createRef();

		this.state = {
			columnsModelArticle: modelArticleTableColumns,
			dataModelArticle   : defaultModelArticleTableData,
			columnsAlarmSensor : alarmSensorTableColumns,
			dataAlarmSensor    : defaultAlarmSensorTableData,
			formData           : {},
			editMode           : false,
			submissionState    : -1,    // -1: Submit/Save, 0: Submitting/Saving, 1: Submitted/Saved
		};
	}

	loadListModelArticle = () => {
		let method = 'POST';
		let url    = ASSEMBLY_API + ALARM_MODEL_ARTICLE;
		let params = {
			"value_yn": 0
		};

		callAxios(method, url, params).then(response => {
			try {
				let responseArray = response.data.data;
				let dataArray     = [];

				responseArray.map(item => {
					item = {
						model_cd  : item.model_cd.toString(),
						model_nm  : item.model_nm.toString(),
						article_no: item.article_no.toString(),
						article_nm: item.article_nm.toString(),
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
		let {formData} = this.state;
		formData       = {
			...formData,
			article_nm: selectedRow.article_nm,
			article_no: selectedRow.article_no,
			model_cd  : selectedRow.model_cd,
			model_nm  : selectedRow.model_nm,
		};
		this.setState({
			formData       : formData,
			editMode       : false,
			submissionState: -1,
		});
	};

	loadListAlarmSensor = () => {
		let method = 'POST';
		let url    = ASSEMBLY_API + ALARM_SENSOR;

		callAxios(method, url, {}).then(response => {
			try {
				let responseArray = response.data.data;
				let dataArray     = [];

				responseArray.map(item => {
					item = {
						model_cd  : item.model_cd ? item.model_cd : '0',
						model_nm  : item.model_nm ? item.model_nm : '0',
						article_no: item.article_no ? item.article_no : '0',
						article_nm: item.article_nm ? item.article_nm : '0',
						process_cd: item.process_cd ? item.process_cd : '0',
						process_nm: item.process_nm ? item.process_nm : '0',

						temp_standard: item.temp_standard_from + '-' + item.temp_standard_to,
						temp_yellow  : item.temp_yellow_first + '-' + item.temp_yellow_last,
						temp_red     : item.temp_red_first + '-' + item.temp_red_last,
						pres_standard: item.pres_standard_from + '-' + item.pres_standard_to,
						pres_yellow  : item.pres_yellow_first + '-' + item.pres_yellow_last,
						pres_red     : item.pres_red_first + '-' + item.pres_red_last,
						cur_standard : item.cur_standard_from + '-' + item.cur_standard_to,
						cur_yellow   : item.cur_yellow_first + '-' + item.cur_yellow_last,
						cur_red      : item.cur_red_first + '-' + item.cur_red_last,

						temp_standard_from: item.temp_standard_from,
						temp_standard_to  : item.temp_standard_to,
						temp_yellow_first : item.temp_yellow_first,
						temp_yellow_last  : item.temp_yellow_last,
						temp_red_first    : item.temp_red_first,
						temp_red_last     : item.temp_red_last,
						pres_standard_from: item.pres_standard_from,
						pres_standard_to  : item.pres_standard_to,
						pres_yellow_first : item.pres_yellow_first,
						pres_yellow_last  : item.pres_yellow_last,
						pres_red_first    : item.pres_red_first,
						pres_red_last     : item.pres_red_last,
						cur_standard_from : item.cur_standard_from,
						cur_standard_to   : item.cur_standard_to,
						cur_yellow_first  : item.cur_yellow_first,
						cur_yellow_last   : item.cur_yellow_last,
						cur_red_first     : item.cur_red_first,
						cur_red_last      : item.cur_red_last,
						definition_value  : item.definition_value,
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
		this.setState({
			submissionState: 0,
		});

		let definition_value = values.definition_value;
		let formData         = this.state.formData;
		let method           = 'POST';
		let url              = '/api/asc/masalarmsensor';
		for (let i = 0; i < definition_value.length; i++) {
			if (!definition_value[i]) {
				let standard_from = 0;
				let standard_to   = 0;
				let yellow_first  = 0;
				let yellow_last   = 0;
				let red_first     = 0;
				let red_last      = 0;
				let sensor_type   = i + 1;
				if (sensor_type == 1) {
					standard_from = values.temp_standard_from;
					standard_to   = values.temp_standard_to;
					yellow_first  = values.temp_yellow_first;
					yellow_last   = values.temp_yellow_last;
					red_first     = values.temp_red_first;
					red_last      = values.temp_red_last;
				} else if (sensor_type == 2) {
					standard_from = values.pres_standard_from;
					standard_to   = values.pres_standard_to;
					yellow_first  = values.pres_yellow_first;
					yellow_last   = values.pres_yellow_last;
					red_first     = values.pres_red_first;
					red_last      = values.pres_red_last;
				} else if (sensor_type == 3) {
					standard_from = values.cur_standard_from;
					standard_to   = values.cur_standard_to;
					yellow_first  = values.cur_yellow_first;
					yellow_last   = values.cur_yellow_last;
					red_first     = values.cur_red_first;
					red_last      = values.cur_red_last;
				}
				let param = {
					"status"       : this.state.editMode ? "UPDATE" : "INSERT",
					"model_cd"     : formData.model_cd,
					"article_no"   : formData.article_no,
					"process_cd"   : formData.process_cd,
					"sensor_type"  : sensor_type,
					"standard_from": standard_from,//1: temp, 2: pressure, 3: curing time
					"standard_to"  : standard_to,
					"yellow_first" : yellow_first,
					"yellow_last"  : yellow_last,
					"red_first"    : red_first,
					"red_last"     : red_last,
					"time_first"   : '0',
					"time_last"    : '0',
					"remark"       : values.remark ? values.remark : '',
					"username"     : "truongho"
				};
				callAxios(method, url, param).then(response => {
					//Update parent combobox items
					try {
						if (response.status == 200) {
							this.loadListAlarmSensor();
							this.loadListModelArticle();

							//reload process loadd
							this.child.ref.current.wrapped.current.callChildLoadProcess({
								model_cd  : formData.model_cd,
								article_no: formData.article_no,
							});
							this.setState({
								submissionState: 1,
							});
							setTimeout(() => {
								if (!this.state.editMode) {
									let formData = this.state.formDate;
									this.setState({
										...formData,
										temp_standard_from: values.temp_standard_from,
										temp_standard_to  : values.temp_standard_to,
										temp_yellow_first : values.temp_yellow_first,
										temp_yellow_last  : values.temp_yellow_last,
										temp_red_first    : values.temp_red_first,
										temp_red_last     : values.temp_red_last,
										pres_standard_from: values.pres_standard_from,
										pres_standard_to  : values.pres_standard_to,
										pres_yellow_first : values.pres_yellow_first,
										pres_yellow_last  : values.pres_yellow_last,
										pres_red_first    : values.pres_red_first,
										pres_red_last     : values.pres_red_last,
										cur_standard_from : values.cur_standard_from,
										cur_standard_to   : values.cur_standard_to,
										cur_yellow_first  : values.cur_yellow_first,
										cur_yellow_last   : values.cur_yellow_last,
										cur_red_first     : values.cur_red_first,
										cur_red_last      : values.cur_red_last,
									});
								}
								this.setState({
									submissionState: -1,
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

	setSelectedProcess = (processCode) => {
		let {formData} = this.state;
		formData       = {
			...formData,
			process_cd        : processCode,
			temp_standard_from: '',
			temp_standard_to  : '',
			temp_yellow_first : '',
			temp_yellow_last  : '',
			temp_red_first    : '',
			temp_red_last     : '',
			pres_standard_from: '',
			pres_standard_to  : '',
			pres_yellow_first : '',
			pres_yellow_last  : '',
			pres_red_first    : '',
			pres_red_last     : '',
			cur_standard_from : '',
			cur_standard_to   : '',
			cur_yellow_first  : '',
			cur_yellow_last   : '',
			cur_red_first     : '',
			cur_red_last      : '',
		};
		this.setState({
			editMode: false,
			formData: formData,
		});
	};

	onAlarmSensorTableRowClick = (e, row) => {
		let selectedRow = row._row.data;
		this.setState({
			editMode       : true,
			submissionState: -1,
			formData       : {
				model_nm          : selectedRow.model_nm,
				model_cd          : selectedRow.model_cd,
				article_no        : selectedRow.article_no,
				article_nm        : selectedRow.article_nm,
				process_cd        : selectedRow.process_cd,
				temp_standard_from: selectedRow.temp_standard_from,
				temp_standard_to  : selectedRow.temp_standard_to,
				temp_yellow_first : selectedRow.temp_yellow_first,
				temp_yellow_last  : selectedRow.temp_yellow_last,
				temp_red_first    : selectedRow.temp_red_first,
				temp_red_last     : selectedRow.temp_red_last,
				pres_standard_from: selectedRow.pres_standard_from,
				pres_standard_to  : selectedRow.pres_standard_to,
				pres_yellow_first : selectedRow.pres_yellow_first,
				pres_yellow_last  : selectedRow.pres_yellow_last,
				pres_red_first    : selectedRow.pres_red_first,
				pres_red_last     : selectedRow.pres_red_last,
				cur_standard_from : selectedRow.cur_standard_from,
				cur_standard_to   : selectedRow.cur_standard_to,
				cur_yellow_first  : selectedRow.cur_yellow_first,
				cur_yellow_last   : selectedRow.cur_yellow_last,
				cur_red_first     : selectedRow.cur_red_first,
				cur_red_last      : selectedRow.cur_red_last,
				definition_value  : selectedRow.definition_value,
			}
		});
		let params = {
			model_cd        : selectedRow.model_cd,
			article_no      : selectedRow.article_no,
			definition_value: selectedRow.definition_value,
			process_cd      : selectedRow.process_cd,
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
	form: 'MasterAlarm',
})(MasterAlarm);
