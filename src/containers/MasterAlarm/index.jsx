import React, {Component} from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import AlarmForm from "./components/AlarmForm";
import {reduxForm} from "redux-form";
import DataTable from "../../shared/components/data_table/DataTable";

class MasterAlarm extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
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
		let columns1 = [
			{ title: "Model", field: "model", width: '50%', align: "center", headerFilter: "input" },
			{ title: "Article", field: "article", width: '50%', align: "center", headerFilter: "input" }
		];

		let dataArray1 = [
			{
				model: "mmmmmmmmmmmmmmmm",
				article: "aaaaaaaaaaaaaaaaa"
			},
		];

		let columns2 = [
			{ title: "MODEL", field: "model", width: '9%', align: "center", headerFilter: "input" },
			{ title: "ARTICLE", field: "article", width: '9%', align: "center", headerFilter: "input" },
			{ title: "PROCESS", field: "process", width: '10%', align: "center", headerFilter: "input" },

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
		let dataArray2 = [
			{
				no: "abc",
				model: "abc",
				article: "abc",
				process: "abc",

				temp_stardand: "150-170",
				temp_yellow: "150-170",
				temp_red: "150-170",

				pres_stardand: "150-170",
				pres_yellow: "150-170",
				pres_red: "150-170",

				curr_stardand: "150-170",
				curr_yellow: "150-170",
				curr_red: "150-170",
			},
		];
		return (
			<Container className="dashboard">
				<Row>
					<AlarmForm/>
				</Row>
				<Row style={{marginTop: 50}}>
					<Card>
						<CardBody>
							<Col md={12} lg={12}>
								<DataTable columns={columns2} data={dataArray2} options={{height: "40em",
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

