import React, {Component}                                           from 'react';
import FilterRange
                                                                    from "../../shared/components/filter_range/FilterRange";
import {connect}                                                    from "react-redux";
import {withRouter}                                                 from "react-router-dom";
import {Col, Container, Row}                                        from 'reactstrap';
import LeadTable                                                    from "./components/LeadTable";
import ProductivityTable                                            from "./components/ProductivityTable";
import WorkingHourTable                                             from "./components/WorkingHourTable";
import {ASSEMBLY_API, PRODUCTION_LEAD_TIME, WORKING_HOUR_LEAD_TIME} from "../../constants/constants";
import callAxios                                                    from "../../services/api";
import {changeDateToUnix}                                           from "../../shared/utils/Utilities";

class LeadTime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leadData       : [],
			ccrProcess     : {
				min_process_crr      : '', prod_qty_day: 0, prod_time_pair: 0,
				line_balancing_stitch: 0, line_balancing_shoe_make: 0, line_balancing_all: 0
			},
			workingHourData: [],
			workingHourLabel: [],
			filterFromDate:changeDateToUnix(new Date()),
			filterToDate:changeDateToUnix(new Date()),
			filterLine:'',
			filterModel:'',
			filterArticle:''
		};
		/*leadData: [
		 { mas_cd_nm:'', pair_qty: 0, lead_time: 0, prod_qty_day: 0, prod_time_pair: 0, ccr_yn: 0, min_process_crr: ''},
		 ],*/
		this.retrieveLeadTableData();
		this.retrieveWorkingHourData();
	}

	retrieveLeadTableData = () => {
		let {filterFromDate, filterToDate, filterLine, filterModel, filterArticle} = this.state;
		let method = 'POST';
		let url    = ASSEMBLY_API + PRODUCTION_LEAD_TIME;
		let params = {
			"factory"   : "",
			"line"      : "",
			"model"     : "",
			"article_no": "",
			"process"   : "",
			"from_date" : "1563166026",
			"to_date"   : "1563166026"
		};
		callAxios(method, url, params).then(response => {
			console.log("response 50: ", response);
			let leadData   = response.data.data;
			let ccrProcess = this.findCcrProcess(leadData);
			try {
				this.setState({
					...this.state,
					leadData  : leadData,
					ccrProcess: ccrProcess,
				});
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	handleWorkingData = (workingHourData) => {
		try {
			let labels = [];
			let data = [];
			workingHourData.map(item=>{
				labels.push(item[0]);
				data.push(item[1]);
			});
			this.setState({
				...this.state,
				workingHourData: [{
					data: data,
					backgroundColor: "#2880E9",
				}],
				workingHourLabel: labels
			});

		} catch (e) {
			console.log();
		}
	}

	retrieveWorkingHourData = () => {
		let {filterFromDate, filterToDate, filterLine, filterModel, filterArticle} = this.state;
		let method = 'POST';
		let url    = ASSEMBLY_API + WORKING_HOUR_LEAD_TIME;
		let params = {
			"factory"   : "",
			"line"      : "",
			"model"     : "",
			"article_no": "",
			"process"   : "",
			"from_date" : "1563757203",
			"to_date"   : "1563813024"
		};
		callAxios(method, url, params).then(response => {
			console.log("response 99: ", response);
			try {
				let workingHourDataArray = response.data.data;
				this.handleWorkingData(workingHourDataArray);
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	handleFilterFromDateChange    = (newValue) => {
		console.log("handleFilterFromDateChange");
		console.log("value: ", newValue);
		this.setState({
			...this.state,
			filterFromDate:changeDateToUnix(newValue),
		});

		this.retrieveLeadTableData();
		this.retrieveWorkingHourData();
	}

	handleFilterToDateChange    = (newValue) => {
		console.log("handleFilterToDateChange");
		console.log("value: ", newValue);
		this.setState({
			...this.state,
			filterToDate:changeDateToUnix(newValue),
		});

		this.retrieveLeadTableData();
		this.retrieveWorkingHourData();
	}
	handleFilterModelChange   = (newValue) => {
		console.log("handleFilterModelChange");
		console.log("newValue: ", newValue);
		console.log("newValue.value: ", newValue.value);
		this.setState({
			...this.state,
			filterModel:newValue,
		});

		this.retrieveLeadTableData();
		this.retrieveWorkingHourData();
	}
	handleFilterLineChange    = (newValue) => {
		console.log("handleFilterLineChange");
		console.log("newValue: ", newValue);
		console.log("newValue.value: ", newValue.value);
		this.setState({
			...this.state,
			filterLine:newValue.value,
		});

		this.retrieveLeadTableData();
		this.retrieveWorkingHourData();
	}
	handleFilterArticleChange = (newValue) => {
		console.log("handleFilterArticleChange");
		console.log("newValue: ", newValue);
		console.log("newValue.value: ", newValue.value);
		this.setState({
			...this.state,
			filterArticle:newValue.value,
		});

		this.retrieveLeadTableData();
		this.retrieveWorkingHourData();
	}

	findCcrProcess = (leadData) => {
		let ccrProcess = {
			min_process_crr      : '', prod_qty_day: 0, prod_time_pair: 0,
			line_balancing_stitch: 0, line_balancing_shoe_make: 0, line_balancing_all: 0
		};
		try {
			let exit       = false, i = 0;
			do {
				if (leadData[i].min_process_crr != "") {
					exit       = true;
					ccrProcess = leadData[i];
				}
				i++;
			} while (i < leadData.length && !exit)
		} catch(e){
			console.log("Error: ", e);
		}

		return ccrProcess;
	}

	render() {
		let {leadData, ccrProcess, workingHourData, workingHourLabel} = this.state;
		//let ccrProcess = this.findCcrProcess(leadData);
		return (
			<Container className="dashboard">
				<h3>Dashboard/Production Lead Time</h3>
				<hr/>
				<FilterRange handleFilterFromDateChange={this.handleFilterFromDateChange}
				             handleFilterToDateChange={this.handleFilterToDateChange}
				             handleFilterModelChange={this.handleFilterModelChange}
				             handleFilterLineChange={this.handleFilterLineChange}
				             handleFilterArticleChange={this.handleFilterArticleChange}/>
				<Row>
					<Col md={6} lg={6}>
						<LeadTable leadData={leadData}/>
					</Col>
					<Col md={6} lg={6}>
						<div className="d-flex flex-column">
							<Col md={12} lg={12} style={{backgroundColor: '#1E2229'}}>
								<ProductivityTable ccrProcess={ccrProcess}/>
							</Col>
							<hr/>
							<Col md={12} lg={12} style={{backgroundColor: '#232529'}}>
								<WorkingHourTable workingHourData={workingHourData} workingHourLabel={workingHourLabel}/>
							</Col>
						</div>
					</Col>
				</Row>
			</Container>

		);
	}
}

const mapStateToProps = (state) => ({
	filter: state.filter,
});

export default withRouter(connect(mapStateToProps)(LeadTime));

