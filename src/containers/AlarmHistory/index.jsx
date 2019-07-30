import React, {Component}                                                from 'react';
import {withRouter}                                                      from "react-router-dom";
import {Col, Container}                                                  from "reactstrap";
import FilterRange                                                       from "../../shared/components/filter_range/FilterRange";
import {changeDateToUnix}                                                from "../../shared/utils/Utilities";
import {ASSEMBLY_API, PRODUCTION_LEAD_TIME_DETAIL} from "../../constants/urlConstants";
import callAxios                                                         from "../../services/api";
import AlarmHistoryTable                                                 from "./components/AlarmHistoryTable";

class AlarmHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alarmHistoryData: [],
			filterFromDate: changeDateToUnix(new Date()),
			filterToDate  : changeDateToUnix(new Date()),
			filterLine    : '',
			filterModel   : '',
			filterArticle : ''
		};
		//this.loadMachineAlarmTable();
	}

	loadMachineAlarmTable = () => {
		let {filterFromDate, filterToDate, filterLine, filterModel, filterArticle} = this.state;
		let method = 'POST';
		let url    = ASSEMBLY_API + ALARM_HISTORY;
		let params = {
			"factory": "",
			"line": "",
			"process": "",
			"model": "",
			"article_no": "",
			"from_date": "1562660433",
			"to_date": "1562660433"
		}
		callAxios(method, url, params).then(response => {
			console.log("response 36: ", response);
			console.log(typeof response);
			//response =
			// {"status":200,"data":[{"alarm_date":"2019.07.09","factory_cd":"AS2","line_cd":"2030","process_cd":"20105","sensor_type":"Temp","alarm_seq":1,"alarm_time":"05:15:40","alarm":"G","value":"","article_no":"R6-30500","created_date":1562660433,"standard_from":1234570000,"standard_to":2,"model_nm":"PRINCESS WIDE D","article_nm":"R6-30500","process_nm":"Packpart Molding"}]}

			try {
				let alarmHistoryData = [{"alarm_date":"2019.07.09","factory_cd":"AS2","line_cd":"2030","process_cd":"20105","sensor_type":"Temp","alarm_seq":1,"alarm_time":"05:15:40","alarm":"G","value":"","article_no":"R6-30500","created_date":1562660433,"standard_from":1234570000,"standard_to":2,"model_nm":"PRINCESS WIDE D","article_nm":"R6-30500","process_nm":"Packpart Molding"}];
				console.log("alarmHistoryData: ", alarmHistoryData);
				this.setState({
					...this.state,
					alarmHistoryData: alarmHistoryData,
				});
			} catch (e) {
				console.log("Error: ", e);
			}
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
		let {alarmHistoryData} = this.state;
		return (
			<Container className="dashboard">
				<h3>DASHBOARD / ALARM HISTORY</h3>
				<hr/>
				<FilterRange handleFilterFromDateChange={this.handleFilterFromDateChange}
				             handleFilterToDateChange={this.handleFilterToDateChange}
				             handleFilterModelChange={this.handleFilterModelChange}
				             handleFilterLineChange={this.handleFilterLineChange}
				             handleFilterArticleChange={this.handleFilterArticleChange}/>
				<hr/>
				<Col md={12} lg={12}>
					<AlarmHistoryTable alarmHistoryData={alarmHistoryData}/>
				</Col>
			</Container>
		);
	}
}

export default withRouter(AlarmHistory);
