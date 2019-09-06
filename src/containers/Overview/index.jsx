import React, {Component}              from 'react';
import FilterRange
                                       from "../../shared/components/filter_range/FilterRange";
import {Col, Container, Row} from 'reactstrap';
import {changeDateToUnix}       from "../../shared/utils/Utilities";
import ComputerStiching    from "./components/ComputerStiching";
import NormalStiching      from "./components/NormalStiching";
import PreStiching         from "./components/PreStiching";
import BackpackMolding     from "./components/BackpackMolding";
import ToeMolding          from "./components/ToeMolding";
import Strobel                             from "./components/Strobel";
import HeartChamber                        from "./components/HeartChamber";
import Cememting                           from "./components/Cememting";
import AttachSoleWithUpper                                             from "./components/AttachSoleWithUpper";
import Chiller                                                         from "./components/Chiller";
import MetalDetect                                                     from "./components/MetalDetect";
import QIPDetect                                                       from "./components/QIPDetect";
import Packing                                                         from "./components/Packing";
import LineProductivity                                                from "./components/LineProductivity";
import {PROCESS_CHART_DASHBOARD, ASSEMBLY_API, PROCESS_TEMP_DASHBOARD} from "../../constants/urlConstants";
import {ALARM_MASTER_PAGE_CONSTANTS}                                   from "../MasterAlarm/constants";
import callAxios                                                       from "../../services/api";

class Overview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterFromDate:changeDateToUnix(new Date(), "start"),
			filterToDate:changeDateToUnix(new Date(), "end"),
			filterLine:'',
			filterModel:'',
			filterArticle:'',
			computerStichingData:[],
			normalStichingData:[],
			preStichingData:[],
			strobelData:[],
			qipDefectData:[],
			packingData:[],
			backpackMoldingData:[],
			toeMoldingData:[],
			heatChamberData:[],
			cementingData:[],
			attachSoleWithUpperData:[],
			chillerData:[],
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevState.filterArticle !== this.state.filterArticle || prevState.filterFromDate !== this.state.filterFromDate
		    || prevState.filterToDate !== this.state.filterToDate
		    || prevState.filterLine !== this.state.filterLine || prevState.filterModel !== this.state.filterModel
			|| prevState.filterArticle !== this.state.filterArticle){
		}
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


	getComputerStichingData = () => {
		let method  = 'POST';
		let url     = ASSEMBLY_API + PROCESS_CHART_DASHBOARD;
		let params  = {
			"factory": "",
			"line": "",
			"process": "20105",
			"model":"",
			"article_no":"",
			"from_date": 1562722712,
			"to_date": 1562722712
		};

		callAxios(method, url, params).then(response => {
			try {
				let data = response.data.data;
				this.setState((state, props) => ({
					computerStichingData: data,
				}));
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	getNormalStichingData = () => {
		let method  = 'POST';
		let url     = ASSEMBLY_API + PROCESS_CHART_DASHBOARD;
		let params  = {
			"factory": "",
			"line": "",
			"process": "20105",
			"model":"",
			"article_no":"",
			"from_date": 1562722712,
			"to_date": 1562722712
		};

		callAxios(method, url, params).then(response => {
			try {
				let data = response.data.data;
				this.setState((state, props) => ({
					normalStichingData: data,
				}));
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	getPreStichingData = () => {
		let method  = 'POST';
		let url     = ASSEMBLY_API + PROCESS_CHART_DASHBOARD;
		let params  = {
			"factory": "",
			"line": "",
			"process": "20105",
			"model":"",
			"article_no":"",
			"from_date": 1562722712,
			"to_date": 1562722712
		};

		callAxios(method, url, params).then(response => {
			try {
				let data = response.data.data;
				this.setState((state, props) => ({
					preStichingData: data,
				}));
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	getStrobelData = () => {
		let method  = 'POST';
		let url     = ASSEMBLY_API + PROCESS_CHART_DASHBOARD;
		let params  = {
			"factory": "",
			"line": "",
			"process": "20105",
			"model":"",
			"article_no":"",
			"from_date": 1562722712,
			"to_date": 1562722712
		};

		callAxios(method, url, params).then(response => {
			try {
				let data = response.data.data;
				this.setState((state, props) => ({
					strobelData: data,
				}));
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	getQipDefectData = () => {
		let method  = 'POST';
		let url     = ASSEMBLY_API + PROCESS_CHART_DASHBOARD;
		let params  = {
			"factory": "",
			"line": "",
			"process": "20105",
			"model":"",
			"article_no":"",
			"from_date": 1562722712,
			"to_date": 1562722712
		};

		callAxios(method, url, params).then(response => {
			try {
				let data = response.data.data;
				this.setState((state, props) => ({
					qipDefectData: data,
				}));
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	getPackingData = () => {
		let method  = 'POST';
		let url     = ASSEMBLY_API + PROCESS_CHART_DASHBOARD;
		let params  = {
			"factory": "",
			"line": "",
			"process": "20105",
			"model":"",
			"article_no":"",
			"from_date": 1562722712,
			"to_date": 1562722712
		};

		callAxios(method, url, params).then(response => {
			try {
				let data = response.data.data;
				this.setState((state, props) => ({
					packingData: data,
				}));
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	getBackPackMoldingData = () => {
		let method  = 'POST';
		let url     = ASSEMBLY_API + PROCESS_TEMP_DASHBOARD;
		let params  = {
			"factory": "",
			"line": "",
			"process": "20105",
			"model":"",
			"article_no":"",
			"from_date": 1562722712,
			"to_date": 1562722712
		};

		callAxios(method, url, params).then(response => {
			try {
				let data = response.data.data;
				this.setState((state, props) => ({
					backPackMoldingData: data,
				}));
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	getToeMoldingData = () => {
		let method  = 'POST';
		let url     = ASSEMBLY_API + PROCESS_TEMP_DASHBOARD;
		let params  = {
			"factory": "",
			"line": "",
			"process": "20105",
			"model":"",
			"article_no":"",
			"from_date": 1562722712,
			"to_date": 1562722712
		};

		callAxios(method, url, params).then(response => {
			try {
				let data = response.data.data;
				this.setState((state, props) => ({
					toeMoldingData: data,
				}));
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	getHeatChamberData = () => {
		let method  = 'POST';
		let url     = ASSEMBLY_API + PROCESS_TEMP_DASHBOARD;
		let params  = {
			"factory": "",
			"line": "",
			"process": "20105",
			"model":"",
			"article_no":"",
			"from_date": 1562722712,
			"to_date": 1562722712
		};

		callAxios(method, url, params).then(response => {
			try {
				let data = response.data.data;
				this.setState((state, props) => ({
					heatChamberData: data,
				}));
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	getCementingData = () => {
		let method  = 'POST';
		let url     = ASSEMBLY_API + PROCESS_TEMP_DASHBOARD;
		let params  = {
			"factory": "",
			"line": "",
			"process": "20105",
			"model":"",
			"article_no":"",
			"from_date": 1562722712,
			"to_date": 1562722712
		};

		callAxios(method, url, params).then(response => {
			try {
				let data = response.data.data;
				this.setState((state, props) => ({
					cementingData: data,
				}));
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	getAttachSoleWithUpperData = () => {
		let method  = 'POST';
		let url     = ASSEMBLY_API + PROCESS_TEMP_DASHBOARD;
		let params  = {
			"factory": "",
			"line": "",
			"process": "20105",
			"model":"",
			"article_no":"",
			"from_date": 1562722712,
			"to_date": 1562722712
		};

		callAxios(method, url, params).then(response => {
			try {
				let data = response.data.data;
				this.setState((state, props) => ({
					attachSoleWithUpperData: data,
				}));
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	getChillerData = () => {
		let method  = 'POST';
		let url     = ASSEMBLY_API + PROCESS_TEMP_DASHBOARD;
		let params  = {
			"factory": "",
			"line": "",
			"process": "20105",
			"model":"",
			"article_no":"",
			"from_date": 1562722712,
			"to_date": 1562722712
		};

		callAxios(method, url, params).then(response => {
			try {
				let data = response.data.data;
				this.setState((state, props) => ({
					chillerData: data,
				}));
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	componentDidMount(){
		this.getComputerStichingData();
		this.getNormalStichingData();
		this.getPreStichingData();
		this.getStrobelData();
		this.getQipDefectData();
		this.getPackingData();
		this.getBackPackMoldingData();
		this.getToeMoldingData();
		this.getHeatChamberData();
		this.getCementingData();
		this.getAttachSoleWithUpperData();
		this.getChillerData();
	}

	render() {
		let {computerStichingData, normalStichingData, preStichingData, strobelData, qipDefectData, packingData, backPackMoldingData, toeMoldingData, heatChamberData, cementingData, attachSoleWithUpperData, chillerData} = this.state;
		return (
			<Container className="dashboard">
				<h3>Dashboard/Overview</h3>
				<hr/>
				<FilterRange handleFilterFromDateChange={this.handleFilterFromDateChange}
				             handleFilterToDateChange={this.handleFilterToDateChange}
				             handleFilterModelChange={this.handleFilterModelChange}
				             handleFilterLineChange={this.handleFilterLineChange}
				             handleFilterArticleChange={this.handleFilterArticleChange}/>
				<hr/>
				<Row>
					<Col md={9} lg={9}>
						<Row>
							<ComputerStiching computerStichingData={computerStichingData}/>
							<NormalStiching normalStichingData={normalStichingData}/>
							<PreStiching preStichingData={preStichingData} />
						</Row>
						<Row>
							<BackpackMolding backPackMoldingData={backPackMoldingData}/>
							<ToeMolding toeMoldingData={toeMoldingData} />
							<Strobel strobelData={strobelData}/>
						</Row>
						<Row>
							<HeartChamber heatChamberData={heatChamberData}/>
							<Cememting cementingData={cementingData}/>
							<AttachSoleWithUpper attachSoleWithUpperData={attachSoleWithUpperData}/>
						</Row>
					</Col>
					<Col md={3} lg={3} style={{marginBottom: 15, marginLeft: -16, color: '#FFFFFF'}}>
						<LineProductivity />
					</Col>
				</Row>
				<Row>
					<Col md={9} lg={9}>
						<Row>
							<Chiller chillerData={chillerData}/>
							<MetalDetect />
							<QIPDetect qipDefectData={qipDefectData} />
						</Row>
					</Col>
					<Col md={3} lg={3} style={{marginBottom: 15, marginLeft: -16}}>
						<Packing packingData={packingData} />
					</Col>
				</Row>
			</Container>

		);
	}
}

export default Overview;

