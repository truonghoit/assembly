import React, {Component} from "react";
import {withRouter}       from "react-router-dom";
import {changeDateToUnix} from "../../shared/utils/Utilities";
import FilterRange        from "../../shared/components/filter_range/FilterRange";
import {Container, Row}   from 'reactstrap';
import LeadDetailTable    from './Components/LeadDetailTable';
import MixedLineBarChart  from "../../shared/components/chart/MixedLineBarChart";

class LeadTimeDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterFromDate: changeDateToUnix(new Date()),
			filterToDate  : changeDateToUnix(new Date()),
			filterLine    : '',
			filterModel   : '',
			filterArticle : ''
		};
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
						<MixedLineBarChart />
					</div>
					<div className="col-2">
					</div>
				</Row>
				<hr/>
				<Row>
					<LeadDetailTable />
				</Row>
			</Container>
		);
	}
}


export default withRouter(LeadTimeDetail);
