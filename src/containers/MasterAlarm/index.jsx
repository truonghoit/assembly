import React, {Component} from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import AlarmForm from "./components/AlarmForm";
import {reduxForm} from "redux-form";
import DataTable from "../../shared/components/data_table/DataTable";
import {ALARM_MODEL_ARTICLE, ASSEMBLY_API, ALARM_SENSOR} from "../../constants/constants";
import callAxios from "../../services/api";

class MasterAlarm extends Component {
	constructor(props) {
		super(props);

		let columnsModelArticle = [
			{ title: "Model Code", field: "model_cd", visible: false },
			{ title: "MODEL", field: "model_nm", width: '50%', align: "center", headerFilter: "input" },
			{ title: "Article", field: "article_no", visible: false},
			{ title: "ARTICLE", field: "article_nm", width: '50%', align: "center", headerFilter: "input" }
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
			{ title: "MODEL CODE", field: "model_cd", visible:false},
			{ title: "MODEL", field: "model_nm", width: '9%', align: "center", headerFilter: "input" },
			{ title: "ARTICLE NO", field: "article_no", visible:false},
			{ title: "ARTICLE", field: "article_nm", width: '9%', align: "center", headerFilter: "input" },
			{ title: "PROCESS CODE", field: "process_cd", visible: false},
			{ title: "PROCESS", field: "process_nm", width: '10%', align: "center", headerFilter: "input" },

			{
				title: "TEMPERATURE",
				columns: [
					{ title: "<span style='color:#03CF65; font-size: large'>●</span>", field: "temp_stardand", width: '8%', align: "center", formatterParams: this.formatStandard},
					{ title: "<span style='color:#FFD44F; font-size: large'>●</span>", field: "temp_yellow", width: '8%', align: "center", formatterParams: this.formatYellow},
					{ title: "<span style='color:#F84E4E; font-size: large'>●</span>", field: "temp_red", width: '8%', align: "center", formatterParams: this.formatRed},
				],
			},
			{
				title: "PRESSURE",
				columns: [
					{ title: "<span style='color:#03CF65; font-size: large'>●</span>", field: "pres_stardand", width: '8%', align: "center", formatterParams: this.formatStandard},
					{ title: "<span style='color:#FFD44F; font-size: large'>●</span>", field: "pres_yellow", width: '8%', align: "center", formatterParams: this.formatYellow},
					{ title: "<span style='color:#F84E4E; font-size: large'>●</span>", field: "pres_red", width: '8%', align: "center", formatterParams: this.formatRed},
				],
			},
			{
				title: "CURING TIME",
				columns: [
					{ title: "<span style='color:#03CF65; font-size: large'>●</span>", field: "curr_stardand", width: '8%', align: "center", formatterParams: this.formatStandard},
					{ title: "<span style='color:#FFD44F; font-size: large'>●</span>", field: "curr_yellow", width: '8%', align: "center", formatterParams: this.formatYellow},
					{ title: "<span style='color:#F84E4E; font-size: large'>●</span>", field: "curr_red", width: '8%', align: "center", formatterParams: this.formatRed},
				],
			},
		];

		let dataAlarmSensor = [
			{
				model_cd: '0',
				model_nm: '0',
				article_no: '0',
				article_nm: '0',
				process_cd: '0',
				process_nm: '0',

				temp_stardand: '0-0',
				temp_yellow: '0-0',
				temp_red:  '0-0',
				pres_stardand: '0-0',
				pres_yellow: '0-0',
				pres_red: '0-0',
				curr_stardand: '0-0',
				curr_yellow: '0-0',
				curr_red: '0-0',
			}
		]

		this.state = {
			columnsModelArticle: columnsModelArticle,
			dataModelArticle: dataModelArticle,
			dataAlarmSensor: dataAlarmSensor,
			columnAlarmSensor: columnAlarmSensor,
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

	loadListAlarmSensor = () => {
		let method = 'POST';
		let url = ASSEMBLY_API + ALARM_SENSOR;

		callAxios(method, url, {}).then(response => {
			try {
				let responseArray = response.data.data;
				console.log("loadListAlarmSensor");
				console.log("responseArray: ", responseArray);

				let dataArray = [];

				responseArray.map(item => {
					item = {
						model_cd: item.model_cd?item.model_cd:'0',
						model_nm: item.model_nm?item.model_nm:'0',
						article_no: item.article_no?item.article_no:'0',
						article_nm: item.article_nm?item.article_nm:'0',
						process_cd: item.process_cd?item.process_cd:'0',
						process_nm: item.process_nm?item.process_nm:'0',

						temp_stardand: item.temp_standard_from + '-' + item.temp_standard_to,
						temp_yellow: item.temp_yellow_first + '-' + item.temp_yellow_last,
						temp_red:  item.temp_red_first + '-' + item.temp_red_last,
						pres_stardand: item.pres_standard_from + '-' + item.pres_standard_to,
						pres_yellow: item.pres_yellow_first + '-' + item.pres_yellow_last,
						pres_red: item.pres_red_first + '-' + item.pres_red_last,
						curr_stardand: item.curr_standard_from + '-' + item.curr_standard_to,
						curr_yellow: item.curr_yellow_from + '-' + item.curr_yellow_to,
						curr_red: item.curr_red_from + '-' + item.curr_red_to,
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

	render() {

		let {columnsModelArticle, dataModelArticle, columnAlarmSensor, dataAlarmSensor} = this.state;
		return (
			<Container className="dashboard">
				<Row>
					<AlarmForm columnsModelArticle={columnsModelArticle} dataModelArticle={dataModelArticle} />
				</Row>
				<Row style={{marginTop: 50}}>
					<Card>
						<CardBody>
							<Col md={12} lg={12}>
								<DataTable columns={columnAlarmSensor} data={dataAlarmSensor} options={{height: "40em",
									columnVertAlign:"bottom"
								}}/>
							</Col>
						</CardBody>
					</Card>
				</Row>
			</Container>
		);
	}
}

export default reduxForm({
	form: 'MasterAlarm',
})(MasterAlarm);

