import React, {Component}                                                from 'react';
import {withRouter}                                                      from "react-router-dom";
import {Col, Container}                                                  from "reactstrap";
import FilterRange                                                       from "../../shared/components/filter_range/FilterRange";
import {changeDateToUnix}                                                from "../../shared/utils/Utilities";
import {
	ALARM_HISTORY,
	ASSEMBLY_API,
	MACHINE_ALARM_STATUS,
	PRODUCTION_LEAD_TIME_DETAIL
} from "../../constants/urlConstants";
import callAxios                                                         from "../../services/api";
import MachineAlarmStatusTable                                           from "./components/MachineAlarmStatusTable";

class MachineAlarmStatus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			machineAlarmData: [],
			filterFromDate: changeDateToUnix(new Date()),
			filterToDate  : changeDateToUnix(new Date()),
			filterLine    : '',
			filterModel   : '',
			filterArticle : ''
		};
		this.loadMachineAlarmTable();
	}

	loadMachineAlarmTable = () => {
		console.log("loadMachineAlarmTable");
		let method = 'POST';
		let url    = ASSEMBLY_API + ALARM_HISTORY;
		let params = {
			"factory"   : "",
			"line"      : "",
			"model"     : "",
			"article_no": "",
			"process"   : "",
			"from_date" : "0",
			"to_date"   : "0"
		}
		callAxios(method, url, params).then(response => {
			console.log("response: ", response);
		});
	}

	handleFilterFromDateChange = (newValue) => {
		this.setState({
			...this.state,
			filterFromDate: changeDateToUnix(newValue),
		});

	}

	handleFilterToDateChange  = (newValue) => {
		this.setState({
			...this.state,
			filterToDate: changeDateToUnix(newValue),
		});
	}
	handleFilterLineChange    = (newValue) => {
		this.setState({
			...this.state,
			filterLine: newValue.value,
		});
	}
	handleFilterModelChange   = (newValue) => {
		this.setState({
			...this.state,
			filterModel: newValue,
		});
	}
	handleFilterArticleChange = (newValue) => {
		this.setState({
			...this.state,
			filterArticle: newValue.value,
		});
	}

	render() {
		let machineAlarmData = [];
		return (
			<Container className="dashboard">
				<h3>DASHBOARD / MACHINE ALARM STATUS</h3>
				<hr/>
				<FilterRange handleFilterFromDateChange={this.handleFilterFromDateChange}
				             handleFilterToDateChange={this.handleFilterToDateChange}
				             handleFilterModelChange={this.handleFilterModelChange}
				             handleFilterLineChange={this.handleFilterLineChange}
				             handleFilterArticleChange={this.handleFilterArticleChange}/>
				<hr/>
				<Col md={12} lg={12}>
					<MachineAlarmStatusTable machineAlarmData={machineAlarmData}/>
				</Col>
			</Container>
		);
	}
}

export default withRouter(MachineAlarmStatus);
