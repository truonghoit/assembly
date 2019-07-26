import React, {Component}                   from "react";
import {withRouter}                                from "react-router-dom";
import {changeDateToUnix}                          from "../../shared/utils/Utilities";
import FilterRange                                 from "../../shared/components/filter_range/FilterRange";
import {Container, Row}                            from 'reactstrap';
import LeadDetailTable                             from './Components/LeadDetailTable';
import MixedLineBarChart                           from "../../shared/components/chart/MixedLineBarChart";
import {ASSEMBLY_API, PRODUCTION_LEAD_TIME_DETAIL} from "../../constants/urlConstants";
import callAxios                                   from "../../services/api";

class LeadTimeDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leadDetailData: [],
			filterFromDate: changeDateToUnix(new Date()),
			filterToDate  : changeDateToUnix(new Date()),
			filterLine    : '',
			filterModel   : '',
			filterArticle : ''
		};
		this.loadLeadDetailTable();
	}

	loadLeadDetailTable = () => {
		let {filterFromDate, filterToDate, filterLine, filterModel, filterArticle} = this.state;
		let method = 'POST';
		let url    = ASSEMBLY_API + PRODUCTION_LEAD_TIME_DETAIL;
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
			console.log("response 36: ", response);
			try {
				let leadDetailData = response.data.data;
				this.setState({
					...this.state,
					leadDetailData: leadDetailData,
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
		let {leadDetailData} = this.state;
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
					<div className="col-2">
					</div>
					<div className="col-8">
						<MixedLineBarChart style={{width: 1000, height: 300}} />
					</div>
					<div className="col-2">
					</div>
				</Row>
				<hr/>
				<Row>
					<LeadDetailTable leadDetailData={leadDetailData} />
				</Row>
			</Container>
		);
	}
}


export default withRouter(LeadTimeDetail);
