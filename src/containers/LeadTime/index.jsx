import React, {Component}                                           from 'react';
import FilterRange
                                                                    from "../../shared/components/filter_range/FilterRange";
import {connect}                                                    from "react-redux";
import {withRouter}                                                 from "react-router-dom";
import {Col, Container, Row}                                        from 'reactstrap';
import LeadTable                                                    from "./components/LeadTable";
import ProductivityTable                                            from "./components/ProductivityTable";
import WorkingHourTable                                             from "./components/WorkingHourTable";
import {ASSEMBLY_API, PRODUCTION_LEAD_TIME, WORKING_HOUR_LEAD_TIME} from "../../constants/urlConstants";
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
			filterFromDate:changeDateToUnix(new Date(), "start"),
			filterToDate:changeDateToUnix(new Date(), "end"),
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
			this.retrieveLeadTableData();
			this.retrieveWorkingHourData();
		}
	}

	retrieveLeadTableData = () => {
		let {filterFromDate, filterToDate, filterLine, filterModel, filterArticle} = this.state;
		let method = 'POST';
		let url    = ASSEMBLY_API + PRODUCTION_LEAD_TIME;
		let params = {
			"factory"   : "",
			"line"      : filterLine,
			"model"     : filterModel,
			"article_no": filterArticle,
			"process"   : "",
			"from_date" : filterFromDate,
			"to_date"   : filterToDate
		};
		callAxios(method, url, params).then(response => {
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
			if (workingHourData && workingHourData[0].chart_data){
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
			} else {
				this.setState({
					...this.state,
					workingHourData: [{
						data: [0, 0, 0, 0, 0,
						       0, 0, 0, 0, 0,
						       0, 0, 0, 0, 0,
						       0],
						backgroundColor: "#2880E9",
					}],
					workingHourLabel: ["Computer Stiching", "Normal Stiching", "Backpack Molding", "Toe Molding", "Strobel",
					                   "Lasting", "Heel Lasting", "Heat Chamber", "Negative Gage", "Cementing",
					                   "Attach Sole With Upper", "Chiller", "Delasting", "Metal Detect", "QIP Defect",
					                   "Packing"]
				});
			}
		} catch (e) {
			console.log("Error: ", e);
		}
	}

	retrieveWorkingHourData = () => {
		let {filterFromDate, filterToDate, filterLine, filterModel, filterArticle} = this.state;
		let method = 'POST';
		let url    = ASSEMBLY_API + WORKING_HOUR_LEAD_TIME;
		let params = {
			"factory"   : "",
			"line"      : filterLine,
			"model"     : filterModel,
			"article_no": filterArticle,
			"process"   : "",
			"from_date" : filterFromDate,
			"to_date"   : filterToDate
		};
		callAxios(method, url, params).then(response => {
			try {
				let workingHourDataArray = response.data.data;
				this.handleWorkingData(workingHourDataArray);
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	handleFilterFromDateChange    = (newValue) => {
		this.setState({
			...this.state,
			filterFromDate:changeDateToUnix(newValue, "start"),
		});
	}

	handleFilterToDateChange    = (newValue) => {
		this.setState({
			...this.state,
			filterToDate:changeDateToUnix(newValue, "end"),
		});
	}
	handleFilterModelChange   = (newValue) => {
		this.setState({
			...this.state,
			filterModel:newValue.value,
			filterArticle: ""
		});
	}
	handleFilterLineChange    = (newValue) => {
		this.setState({
			...this.state,
			filterLine:newValue.value,
			filterModel:"",
			filterArticle: ""
		});
	}
	handleFilterArticleChange = (newValue) => {
		this.setState({
			...this.state,
			filterArticle:newValue.value,
		});
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
				<hr/>
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

