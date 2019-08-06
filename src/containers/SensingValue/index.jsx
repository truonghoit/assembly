import React, {Component}    from 'react';
import {withRouter}          from "react-router-dom";
import {Col, Row, Container} from "reactstrap";
import FilterRange         from "../../shared/components/filter_range/FilterRange";
import {changeDateToUnix}  from "../../shared/utils/Utilities";
import {
	SENSING_VALUE,
	ASSEMBLY_API,
	SENSING_TEMP,
	SENSING_PRESS,
	SENSING_TIME
}                          from "../../constants/urlConstants";
import callAxios           from "../../services/api";
import MachineAlarmLeftBar from "./components/MachineAlarmLeftBar";
import ChartArea     from "./components/ChartArea";

class SensingValue extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filterFromDate: changeDateToUnix(new Date()),
			filterToDate  : changeDateToUnix(new Date()),
			filterLine    : '',
			filterModel   : '',
			filterArticle : '',
			processData   : [],
			tempChartData : [],
			pressureChartData : [],
			curingChartData : [],
			selectedProcess: {}
		};
		this.fillLeftBar();
	}

	fillLeftBar = () => {
		/*let labels  = [
			"7:30",
			"8:30",
			"9:30",
			"10:30",
			"11:30",
			"12:30",
			"13:30",
		];
		let chartData = [
			{
				label          : "Line dataset",
				data           : [1, 2, 3, 8, 5, 4, 7],
				type           : 'line',
				borderColor: "#EBEDF1",
				fill: false,
				lineTension: 0,
			},
			{
				label          : "Bar dataset",
				backgroundColor: "#2880E9",
				data           : [3, 5, 2, 4, 6, 8, 2]
			},
		];
		this.setState((state, props)=> {
			chartLabels   : labels,
			chartData     : chartData,
		});*/
		let method = 'POST';
		let url = ASSEMBLY_API + SENSING_VALUE;
		let params = {
			"factory": "",
			"line": "",
			"process": "",
			"from_date": 1562660433,
			"to_date": 1562660433
		}

		callAxios(method, url, params).then(response => {
			try {
				let data = response.data.data;
				let selectedProcess = data[0];
				this.setState((state, props)=>({
					processData: data,
				}));
				this.getChartData(selectedProcess);
			} catch (e){
				console.log("Error: ", e);
			}
		});
	}

	getChartData = (processData=this.state.selectedProcess) => {
		console.log("getChartData getChartData getChartData");
		console.log("getChartData getChartData getChartData");
		console.log("processData: ", processData);
		console.log("state: ", this.state);
		this.setState((state, props) => ({
			selectedProcess: processData,
		}));

		let {filterArticle, filterFromDate, filterToDate, filterLine, filterModel} = this.state;
		let definitionValue = processData.definition_value;
		if (parseInt(definitionValue.charAt(0)) > 0){
			//Get temp data
			let method = 'POST';
			let url = ASSEMBLY_API + SENSING_TEMP;
			let params = {
				"factory": "",
				"line": filterLine,
				"process": processData.process_cd,
				"from_date": filterFromDate,
				"to_date": filterToDate
			}
			console.log("112 112 112 112 112 112 112");
			console.log("112 112 112 112 112 112 112");
			console.log("112 112 112 112 112 112 112");
			console.log("params: ", params);
			console.log("url: ", url);
			callAxios(method, url, params).then(response => {
				try {
					let data = response.data.data;
					console.log("119 119 119 119 119");
					console.log("SENSING_TEMP: ", data);
					this.setState((state,props)=> ({
						tempChartData: data
					}));
				} catch(e){
					console.log("Error: ", e);
				}
			});
		}
		if (parseInt(definitionValue.charAt(1)) > 0){
			//Get pressure data
			let method = 'POST';
			let url = ASSEMBLY_API + SENSING_PRESS;

			let params = {
				"factory": "",
				"line": filterLine,
				"process": processData.process_cd,
				"from_date": filterFromDate,//1563970019
				"to_date": filterToDate//1562722712
			}
			console.log("params: ", params);
			console.log("url: ", url);
			callAxios(method, url, params).then(response => {
				try {
					let data = response.data.data;
					console.log("144 144 144 144 144");
					console.log("SENSING_PRESS: ", data);
					this.setState((state,props)=> ({
						pressureChartData: data
					}));
				} catch(e){
					console.log("Error: ", e);
				}
			});
		}

		if (parseInt(definitionValue.charAt(2)) > 0){
			//Get curing time data
			let method = 'POST';
			let url = ASSEMBLY_API + SENSING_TIME;

			let params = {
				"factory": "",
				"line": filterLine,
				"process": processData.process_cd,
				"from_date": filterFromDate,//1562722712
				"to_date": filterToDate//1562722712
			}
			console.log("params: ", params);
			console.log("url: ", url);
			callAxios(method, url, params).then(response => {
				try {
					let data = response.data.data;
					console.log("172 172 172 172 172");
					console.log("SENSING_TIME: ", data);
					this.setState((state,props)=> ({
						curingChartData: data
					}));
				} catch(e){
					console.log("Error: ", e);
				}
			});
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevState.filterArticle !== this.state.filterArticle || prevState.filterFromDate !== this.state.filterFromDate
		    || prevState.filterToDate !== this.state.filterToDate
		    || prevState.filterLine !== this.state.filterLine || prevState.filterModel !== this.state.filterModel
		    || prevState.filterArticle !== this.state.filterArticle){
			//filterArticle: ""
			// filterFromDate: 1563160349
			// filterLine: ""
			// filterModel: ""
			// filterToDate: 1563937949
			let {filterArticle, filterFromDate, filterToDate, filterLine, filterModel} = this.state;
			console.log("174 174 174 174 174 174 174");
			console.log("174 174 174 174 174 174 174");
			console.log("174 174 174 174 174 174 174");
			console.log(`${filterArticle} - ${filterFromDate} - ${filterToDate} - ${filterLine} - {filterModel}`);
			this.getChartData();

		}
	}

	handleFilterFromDateChange = (newValue) => {
		this.setState((state, props) => ({
			filterFromDate: changeDateToUnix(newValue),
		}));

	}

	handleFilterToDateChange  = (newValue) => {
		this.setState((state, props) => ({
			filterToDate: changeDateToUnix(newValue, "end"),
		}));
	}
	handleFilterLineChange    = (newValue) => {
		this.setState((state, props) => ({
			filterLine: changeDateToUnix(newValue),
		}));
	}
	handleFilterModelChange   = (newValue) => {
		this.setState((state, props) => ({
			filterModel: changeDateToUnix(newValue),
		}));
	}
	handleFilterArticleChange = (newValue) => {
		this.setState((state, props) => ({
			filterArticle: changeDateToUnix(newValue),
		}));
	}

	render() {
		let {tempChartData, pressureChartData, curingChartData, processData} = this.state;
		return (
			<Container className="dashboard">
				<h3>DASHBOARD / SENSING VALUE</h3>
				<hr/>
				<FilterRange handleFilterFromDateChange={this.handleFilterFromDateChange}
				             handleFilterToDateChange={this.handleFilterToDateChange}
				             handleFilterModelChange={this.handleFilterModelChange}
				             handleFilterLineChange={this.handleFilterLineChange}
				             handleFilterArticleChange={this.handleFilterArticleChange}/>
				<hr/>
				<Row>
					<MachineAlarmLeftBar processData={processData} getChartData={this.getChartData}/>
					<Col md={10} lg={10} style={{marginTop: 30,}}>
						{
							tempChartData && tempChartData.length > 0 ? <ChartArea type="temp" chartData={tempChartData} />: ''
						}
						{
							pressureChartData && pressureChartData.length > 0 ? <ChartArea type="pressure" chartData={pressureChartData} />: ''
						}
						{
							curingChartData && curingChartData.length > 0 ? <ChartArea type="curing" chartData={curingChartData}/>: ''
						}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default withRouter(SensingValue);
