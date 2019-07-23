import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import AlarmMasterForm from "./components/AlarmMasterForm";
import {reduxForm} from "redux-form";
import DataTable from "../../shared/components/data_table/DataTable";
import {ALARM_MODEL_ARTICLE, ALARM_SENSOR, ASSEMBLY_API} from "../../constants/constants";
import callAxios from "../../services/api";
import MasterForm from "../MasterPage/components/MasterForm";

class MasterAlarm extends Component {
	constructor(props) {
		super(props);

		this.child = React.createRef();

		let columnsModelArticle = [
			{title: "Model Code", field: "model_cd", visible: false},
			{
				title: "MODEL",
				field: "model_nm",
				width: '49%',
				align: "center",
				headerFilter: "input"
			},
			{title: "Article", field: "article_no", visible: false},
			{
				title: "ARTICLE",
				field: "article_nm",
				width: '50%',
				align: "center",
				headerFilter: "input"
			}
		];

		let dataModelArticle = [
			{
				model_cd: "",
				model_nm: "",
				article_no: "",
				article_nm: ""
			},
		];

		let columnAlarmSensor = [
			{title: "MODEL CODE", field: "model_cd", visible: false},
			{
				title: "MODEL",
				field: "model_nm",
				width: '10%',
				align: "center",
				headerFilter: "input"
			},
			{title: "ARTICLE NO", field: "article_no", visible: false},
			{
				title: "ARTICLE",
				field: "article_nm",
				width: '9%',
				align: "center",
				headerFilter: "input"
			},
			{title: "PROCESS CODE", field: "process_cd", visible: false},
			{
				title: "PROCESS",
				field: "process_nm",
				width: '10%',
				align: "center",
				headerFilter: "input"
			},

			{
				title: "TEMPERATURE",
				columns: [
					{
						title: "<span style='color:#03CF65; font-size: large'>●</span>",
						field: "temp_standard",
						width: '8%',
						align: "center",
						formatterParams: this.formatStandard
					},
					{
						title: "<span style='color:#FFD44F; font-size: large'>●</span>",
						field: "temp_yellow",
						width: '8%',
						align: "center",
						formatterParams: this.formatYellow
					},
					{
						title: "<span style='color:#F84E4E; font-size: large'>●</span>",
						field: "temp_red",
						width: '8%',
						align: "center",
						formatterParams: this.formatRed
					},
				],
			},
			{
				title: "PRESSURE",
				columns: [
					{
						title: "<span style='color:#03CF65; font-size: large'>●</span>",
						field: "pres_standard",
						width: '8%',
						align: "center",
						formatterParams: this.formatStandard
					},
					{
						title: "<span style='color:#FFD44F; font-size: large'>●</span>",
						field: "pres_yellow",
						width: '8%',
						align: "center",
						formatterParams: this.formatYellow
					},
					{
						title: "<span style='color:#F84E4E; font-size: large'>●</span>",
						field: "pres_red",
						width: '8%',
						align: "center",
						formatterParams: this.formatRed
					},
				],
			},
			{
				title: "CURING TIME",
				columns: [
					{
						title: "<span style='color:#03CF65; font-size: large'>●</span>",
						field: "curr_standard",
						width: '8%',
						align: "center",
						formatterParams: this.formatStandard
					},
					{
						title: "<span style='color:#FFD44F; font-size: large'>●</span>",
						field: "curr_yellow",
						width: '8%',
						align: "center",
						formatterParams: this.formatYellow
					},
					{
						title: "<span style='color:#F84E4E; font-size: large'>●</span>",
						field: "curr_red",
						width: '8%',
						align: "center",
						formatterParams: this.formatRed
					},
				],
			},
			{
				columns: [
					{field: "temp_standard_from", visible:false},
					{field: "temp_standard_to", visible:false},
					{field: "temp_yellow_first", visible:false},
					{field: "temp_yellow_last", visible:false},
					{field: "temp_red_first", visible:false},
					{field: "temp_red_last", visible:false},

					{field: "pres_standard_from", visible:false},
					{field: "pres_standard_to", visible:false},
					{field: "pres_yellow_first", visible:false},
					{field: "pres_yellow_last", visible:false},
					{field: "pres_red_first", visible:false},
					{field: "pres_red_last", visible:false},

					{field: "curr_standard_from", visible:false},
					{field: "curr_standard_to", visible:false},
					{field: "curr_yellow_first", visible:false},
					{field: "curr_yellow_last", visible:false},
					{field: "curr_red_first", visible:false},
					{field: "curr_red_last", visible:false},

					{field: "definition_value", visible:false},
				],
			}
		];

		let dataAlarmSensor = [
			{
				model_cd: '0',
				model_nm: '0',
				article_no: '0',
				article_nm: '0',
				process_cd: '0',
				process_nm: '0',

				temp_standard: '0-0',
				temp_yellow: '0-0',
				temp_red: '0-0',
				pres_standard: '0-0',
				pres_yellow: '0-0',
				pres_red: '0-0',
				curr_standard: '0-0',
				curr_yellow: '0-0',
				curr_red: '0-0',

				temp_standard_from: '0',
				temp_standard_to: '0',
				temp_yellow_first: '0',
				temp_yellow_last: '0',
				temp_red_first: '0',
				temp_red_last: '0',
				pres_standard_from: '0',
				pres_standard_to: '0',
				pres_yellow_first: '0',
				pres_yellow_last: '0',
				pres_red_first: '0',
				pres_red_last: '0',
				curr_standard_from: '0',
				curr_standard_to: '0',
				curr_yellow_first: '0',
				curr_yellow_last: '0',
				curr_red_first: '0',
				curr_red_last: '0',
				definition_value: '0',
			}
		]

		this.state = {
			columnsModelArticle: columnsModelArticle,
			dataModelArticle: dataModelArticle,
			dataAlarmSensor: dataAlarmSensor,
			columnAlarmSensor: columnAlarmSensor,
			formData: {},
			editMode: false,
			submissionState: -1,    // -1: Submit/Save, 0: Submitting/Saving, 1: Submitted/Saved
		};
	}

	loadListModelArticle = () => {
		let method = 'POST';
		let url = ASSEMBLY_API + ALARM_MODEL_ARTICLE;
		let params = {
			"value_yn": 0
		};

		callAxios(method, url, params).then(response => {
			try {
				let responseArray = response.data.data;
				let dataArray = [];

				responseArray.map(item => {
					item = {
						model_cd: item.model_cd.toString(),
						model_nm: item.model_nm.toString(),
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
	}

	fillForm = (selectedRow) => {
		let {formData} = this.state;
		formData = {
			...formData,
			article_nm: selectedRow.article_nm,
			article_no: selectedRow.article_no,
			model_cd: selectedRow.model_cd,
			model_nm: selectedRow.model_nm,
		};
		this.setState({
			formData: formData,
			editMode: false,
			submissionState: -1,
		});
	};

	loadListAlarmSensor = () => {
		let method = 'POST';
		let url = ASSEMBLY_API + ALARM_SENSOR;

		callAxios(method, url, {}).then(response => {
			try {
				let responseArray = response.data.data;
				let dataArray = [];

				responseArray.map(item => {
					item = {
						model_cd: item.model_cd ? item.model_cd : '0',
						model_nm: item.model_nm ? item.model_nm : '0',
						article_no: item.article_no ? item.article_no : '0',
						article_nm: item.article_nm ? item.article_nm : '0',
						process_cd: item.process_cd ? item.process_cd : '0',
						process_nm: item.process_nm ? item.process_nm : '0',

						temp_standard: item.temp_standard_from + '-' + item.temp_standard_to,
						temp_yellow: item.temp_yellow_first + '-' + item.temp_yellow_last,
						temp_red: item.temp_red_first + '-' + item.temp_red_last,
						pres_standard: item.pres_standard_from + '-' + item.pres_standard_to,
						pres_yellow: item.pres_yellow_first + '-' + item.pres_yellow_last,
						pres_red: item.pres_red_first + '-' + item.pres_red_last,
						curr_standard: item.curr_standard_from + '-' + item.curr_standard_to,
						curr_yellow: item.curr_yellow_first + '-' + item.curr_yellow_last,
						curr_red: item.curr_red_first + '-' + item.curr_red_last,

						temp_standard_from: item.temp_standard_from,
						temp_standard_to: item.temp_standard_to,
						temp_yellow_first: item.temp_yellow_first,
						temp_yellow_last: item.temp_yellow_last,
						temp_red_first: item.temp_red_first,
						temp_red_last: item.temp_red_last,
						pres_standard_from: item.pres_standard_from,
						pres_standard_to: item.pres_standard_to,
						pres_yellow_first: item.pres_yellow_first,
						pres_yellow_last: item.pres_yellow_last,
						pres_red_first: item.pres_red_first,
						pres_red_last: item.pres_red_last,
						curr_standard_from: item.curr_standard_from,
						curr_standard_to: item.curr_standard_to,
						curr_yellow_first: item.curr_yellow_first,
						curr_yellow_last: item.curr_yellow_last,
						curr_red_first: item.curr_red_first,
						curr_red_last: item.curr_red_last,
						definition_value: item.definition_value,
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
	}

	componentDidMount() {
		this.loadListModelArticle();
		this.loadListAlarmSensor();
	}

	formatStandard = (cell) => {
		cell.getElement().style.color = "#03CF65";
	}

	formatYellow = (cell) => {
		cell.getElement().style.color = "#FFD44F";
	}

	formatRed = (cell) => {
		cell.getElement().style.color = "#F84E4E";
	}

	handleSubmit = (values) => {

		this.setState({
			submissionState: 0,
		});
		console.log("values: ", values);

		let definition_value = values.definition_value;
		let formData = this.state.formData;
		let method = 'POST';
		let url = '/api/asc/masalarmsensor';
		for (let i = 0; i < definition_value.length; i++){
			if (!definition_value[i]){
				let standard_from = 0;
				let standard_to = 0;
				let yellow_first = 0;
				let yellow_last = 0;
				let red_first = 0;
				let red_last = 0;
				let sensor_type = i + 1;
				if (sensor_type == 1){
					standard_from = values.temp_standard_from;
					standard_to =   values.temp_standard_to;
					yellow_first =  values.temp_yellow_first;
					yellow_last =   values.temp_yellow_last;
					red_first =     values.temp_red_first;
					red_last =      values.temp_red_last;
				} else if (sensor_type == 2){
					standard_from = values.pres_standard_from;
					standard_to =   values.pres_standard_to;
					yellow_first =  values.pres_yellow_first;
					yellow_last =   values.pres_yellow_last;
					red_first =     values.pres_red_first;
					red_last =      values.pres_red_last;
				} else if (sensor_type == 3){
					standard_from = values.curr_standard_from;
					standard_to =   values.curr_standard_to;
					yellow_first =  values.curr_yellow_first;
					yellow_last =   values.curr_yellow_last;
					red_first =     values.curr_red_first;
					red_last =      values.curr_red_last;
				}
				let param = {
					"status": this.state.editMode ? "UPDATE" : "INSERT",
					"model_cd": formData.model_cd,
					"article_no": formData.article_no,
					"process_cd": formData.process_cd,
					"sensor_type": sensor_type,
					"standard_from": standard_from,//1: temp, 2: pressure, 3: curing time
					"standard_to": standard_to,
					"yellow_first": yellow_first,
					"yellow_last": yellow_last,
					"red_first": red_first,
					"red_last": red_last,
					"time_first": '0',
					"time_last": '0',
					"remark": values.remark?values.remark:'',
					"username": "truongho"
				}
				console.log("409 409 409 409");
				console.log("409 409 409 409");
				console.log("409 409 409 409");
				console.log("409 409 409 409");
				console.log("param: ", param);
				console.log("url: ", url);
				callAxios(method, url, param).then(response => {
					//Update parent combobox items
					try {
						if (response.status == 200){
							this.loadListAlarmSensor();
							this.loadListModelArticle();

							//reload process loadd
							this.child.ref.current.wrapped.current.callChildLoadProcess({
								model_cd: formData.model_cd,
								article_no: formData.article_no,
							});
							this.setState({
								submissionState: 1,
							});
							setTimeout(() => {
								if (!this.state.editMode){
									let formData = this.state.formDate;
									this.setState({
										...formData,
										temp_standard_from: values.temp_standard_from,
										temp_standard_to: values.temp_standard_to,
										temp_yellow_first: values.temp_yellow_first,
										temp_yellow_last: values.temp_yellow_last,
										temp_red_first: values.temp_red_first,
										temp_red_last: values.temp_red_last,
										pres_standard_from: values.pres_standard_from,
										pres_standard_to: values.pres_standard_to,
										pres_yellow_first: values.pres_yellow_first,
										pres_yellow_last: values.pres_yellow_last,
										pres_red_first: values.pres_red_first,
										pres_red_last: values.pres_red_last,
										curr_standard_from: values.curr_standard_from,
										curr_standard_to: values.curr_standard_to,
										curr_yellow_first: values.curr_yellow_first,
										curr_yellow_last: values.curr_yellow_last,
										curr_red_first: values.curr_red_first,
										curr_red_last: values.curr_red_last,
									});
								}
								this.setState({
									submissionState: -1,
									editMode: false,
								});
							}, 1000);
						}
					} catch(e){
						console.log("Error: ", e);
					}
				});
			}
		}

		//this.alarmForm.current.callFromParent();

		event.preventDefault();
	}

	setSelectedProcess = (processCode) => {
		let {formData} = this.state;
		formData = {
			...formData,
			process_cd: processCode,
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
		};
		this.setState({
			editMode: false,
			formData: formData,
		});
	}

	onAlarmSensorRowClick = (e, row) => {
		//console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
		let selectedRow = row._row.data;
		this.setState({
			editMode: true,
			submissionState: -1,
			formData: {
				model_nm: selectedRow.model_nm,
				model_cd: selectedRow.model_cd,
				article_no: selectedRow.article_no,
				article_nm: selectedRow.article_nm,
				process_cd: selectedRow.process_cd,
				temp_standard_from: selectedRow.temp_standard_from,
				temp_standard_to: selectedRow.temp_standard_to,
				temp_yellow_first: selectedRow.temp_yellow_first,
				temp_yellow_last: selectedRow.temp_yellow_last,
				temp_red_first: selectedRow.temp_red_first,
				temp_red_last: selectedRow.temp_red_last,
				pres_standard_from: selectedRow.pres_standard_from,
				pres_standard_to: selectedRow.pres_standard_to,
				pres_yellow_first: selectedRow.pres_yellow_first,
				pres_yellow_last: selectedRow.pres_yellow_last,
				pres_red_first: selectedRow.pres_red_first,
				pres_red_last: selectedRow.pres_red_last,
				curr_standard_from: selectedRow.curr_standard_from,
				curr_standard_to: selectedRow.curr_standard_to,
				curr_yellow_first: selectedRow.curr_yellow_first,
				curr_yellow_last: selectedRow.curr_yellow_last,
				curr_red_first: selectedRow.curr_red_first,
				curr_red_last: selectedRow.curr_red_last,
				definition_value:selectedRow.definition_value,
			}
		});
		let params = {
			model_cd: selectedRow.model_cd,
			article_no: selectedRow.article_no,
			definition_value: selectedRow.definition_value,
			process_cd: selectedRow.process_cd,
		};
		this.child.ref.current.wrapped.current.callChildLoadProcess(params);
		this.child.ref.current.wrapped.current.setDefinitionValue(params.definition_value, params.process_cd);
		// selectedRow.process_cd);
	};

	onReset = () => {
		this.setState({
			formData: {},
			editMode: false,
		})
	};

	render() {

		let {columnsModelArticle, dataModelArticle, columnAlarmSensor, dataAlarmSensor, formData, submissionState, editMode} = this.state;
		return (
			<Container className="dashboard">
				<Row>
					<AlarmMasterForm columnsModelArticle={columnsModelArticle}
					                 dataModelArticle={dataModelArticle}
					                 fillForm={this.fillForm}
					                 formData={formData}
					                 onSubmit={this.handleSubmit}
					                 setSelectedProcess={this.setSelectedProcess}
					                 ref={(node) => { this.child = node; }}
					                 onReset={this.onReset}
					                 editMode={editMode}
					                 submissionState={submissionState}
					/>
				</Row>
				<Row style={{marginTop: 50}}>
					<Col md={12} lg={12}>
						<DataTable columns={columnAlarmSensor} data={dataAlarmSensor}
						           options={{
							           height: "40em",
							           columnVertAlign: "bottom"
						           }}
						           onRowClick={this.onAlarmSensorRowClick}
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
