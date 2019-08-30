import React, {Component}              from 'react';
import FilterRange
                                       from "../../shared/components/filter_range/FilterRange";
import {Col, Container, Progress, Row} from 'reactstrap';
import {changeDateToUnix}              from "../../shared/utils/Utilities";
import MixedLineBarChart               from "../../shared/components/chart/MixedLineBarChart";
import {FontAwesomeIcon}               from "@fortawesome/react-fontawesome";
import {faCircle, faSquareFull}        from '@fortawesome/free-solid-svg-icons'
import MiniRightBar                    from "./components/MiniRightBar";
import MiniLeftBar                     from "./components/MiniLeftBar";
import DoughnutChart                   from "../../shared/components/chart/DoughnutChart";

class Overview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterFromDate:changeDateToUnix(new Date(), "start"),
			filterToDate:changeDateToUnix(new Date(), "end"),
			filterLine:'',
			filterModel:'',
			filterArticle:''
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

	render() {
		/*let customChartTooltips = {
			callbacks: {
				label: function (tooltipItem, data) {
					let label = 'Actual: ';

					let sumActualProduction = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
					if (sumActualProduction) {
						label += Utilities.changeNumberFormat(sumActualProduction);

						let percentage = Utilities.changeNumberFormat(
							(sumActualProduction / totalActualProduction) * 100
						);
						label += ` (${percentage}%)`;
					} else {
						label += 'N/A';
					}

					return label;
				},
			}
		};*/
		let chartData = [{
			data: [50, 50],
			backgroundColor: ['#0CD0EB', '#005FCE']
		}];
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
							<div style={{width: '32%', height: 180, marginRight: 15, marginBottom: 15}}>
								<div className="d-flex">
									<div className="d-flex flex-column" style={{width:'60%', backgroundColor:'#002F49', height: 180, paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
										<span style={{color: '#FFFFFF', marginBottom: 15}}>Computer Stiching</span>
										<MixedLineBarChart />
									</div>
									<MiniRightBar/>
								</div>
							</div>
							<div style={{backgroundColor: 'yellow', width: '32%', height: 180, marginRight: 15, marginBottom: 15}}>
								<div className="d-flex">
									<div className="d-flex flex-column" style={{width:'60%', backgroundColor:'#002F49', height: 180, paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
										<span style={{color: '#FFFFFF', marginBottom: 15}}>Normal Stiching</span>
										<MixedLineBarChart />
									</div>
									<MiniRightBar/>
								</div>
							</div>
							<div style={{backgroundColor: 'purple', width: '32%', height: 180, marginBottom: 15}}>
								<div className="d-flex">
									<div className="d-flex flex-column" style={{width:'60%', backgroundColor:'#002F49', height: 180, paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
										<span style={{color: '#FFFFFF', marginBottom: 15}}>Pre. Stiching</span>
										<MixedLineBarChart />
									</div>
									<MiniRightBar/>
								</div>
							</div>
						</Row>
						<Row>
							<div style={{width: '32%', height: 180, marginRight: 15, marginBottom: 15}}>
								<div className="d-flex">
									<MiniLeftBar process="Backpack Molding" tempPressTimer="111"/>
									<MiniRightBar/>
								</div>
							</div>
							<div style={{width: '32%', height: 180, marginRight: 15, marginBottom: 15}}>
								<div className="d-flex">
									<MiniLeftBar process="Toe Molding" tempPressTimer="111"/>
									<MiniRightBar/>
								</div>
							</div>
							<div style={{width: '32%', height: 180, marginBottom: 15}}>
								<div className="d-flex">
									<div className="d-flex flex-column" style={{width:'60%', backgroundColor:'#002F49', height: 180, paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
										<span style={{color: '#FFFFFF', marginBottom: 15}}>Strobel</span>
										<MixedLineBarChart />
									</div>
									<MiniRightBar/>
								</div>
							</div>
						</Row>
						<Row>
							<div style={{width: '32%', height: 180, marginRight: 15, marginBottom: 15}}>
								<div className="d-flex">
									<MiniLeftBar process="Heat Chamber" tempPressTimer="100"/>
									<MiniRightBar/>
								</div>
							</div>
							<div style={{width: '32%', height: 180, marginRight: 15, marginBottom: 15}}>
								<div className="d-flex">
									<MiniLeftBar process="Cementing" tempPressTimer="100"/>
									<MiniRightBar/>
								</div>
							</div>
							<div style={{width: '32%', height: 180, marginBottom: 15, marginRight: 15}}>
								<div className="d-flex">
									<MiniLeftBar process="Attach Sole With Upper" tempPressTimer="011"/>
									<MiniRightBar/>
								</div>
							</div>
						</Row>
					</Col>
					<Col md={3} lg={3} style={{marginBottom: 15, marginLeft: -16, color: '#FFFFFF'}}>
						<div style={{height: '100%', paddingLeft: 15, paddingRight: 15, backgroundColor: '#232529'}}>
							<div className="d-flex flex-wrap">
								<Col md={12} lg={12} style={{marginTop: 30, marginLeft: 70, color: '#FFFFFF', fontSize: 18}}><span>LINE PRODUCTIVITY</span></Col>
								<div className="d-flex mt-5" style={{width: '100%', justifyContent: 'space-around'}}>
									<div className="d-flex flex-column text-white">
										<div md={12} lg={12} className="bold-text h3">1425</div>
										<div md={12} lg={12}>pairs/day</div>
									</div>
									<div className="d-flex flex-column  text-white">
										<div md={12} lg={12} className="bold-text h3">22</div>
										<div md={12} lg={12}>mins/pair</div>
									</div>
								</div>
								<div className="d-flex text-white" style={{marginTop: 30, width: '100%', justifyContent: 'space-around'}}>
									<div className="bold-text">CCR Process</div>
									<div style={{color: '#FF9356'}}>Attach Sole with Upper</div>
								</div>
							</div>
							<div className="progress-wrap progress-wrap--small progress-wrap--lime-gradient progress-wrap--label-top mt-5">
								<div className="d-flex">
									<Col md={7} lg={7} style={{marginLeft: -15}}>
										LINE BALANCING
									</Col>
									<Col md={3} lg={3}>
									</Col>
									<Col md={2} lg={2} style={{marginLeft: 20}}>
										92.08%
									</Col>
								</div>
								<Progress value={92}>
								</Progress>
							</div>
							<div className="progress-wrap progress-wrap--small progress-wrap--lime-gradient progress-wrap--label-top  mt-5">
								<div className="d-flex">
									<Col md={7} lg={7} style={{marginLeft: -15}}>
										PPH
									</Col>
									<Col md={3} lg={3}>
									</Col>
									<Col md={2} lg={2} style={{marginLeft: 20}}>
										92.08%
									</Col>
								</div>
								<Progress value={92}>
								</Progress>
							</div>
							<div className="progress-wrap progress-wrap--small progress-wrap--lime-gradient progress-wrap--label-top  mt-3">
								<div className="d-flex">
									<Col md={7} lg={7} style={{marginLeft: -15}}>
										RFT
									</Col>
									<Col md={3} lg={3}>
									</Col>
									<Col md={2} lg={2} style={{marginLeft: 20}}>
										92.08%
									</Col>
								</div>
								<Progress value={92}>
								</Progress>
							</div>
							<div className="progress-wrap progress-wrap--small progress-wrap--lime-gradient progress-wrap--label-top  mt-3">
								<div className="d-flex">
									<Col md={7} lg={7} style={{marginLeft: -15}}>
										EFF
									</Col>
									<Col md={3} lg={3}>
									</Col>
									<Col md={2} lg={2} style={{marginLeft: 20}}>
										92.08%
									</Col>
								</div>
								<Progress value={92}>
								</Progress>
							</div>
						</div>
					</Col>
				</Row>
				<Row>
					<Col md={9} lg={9}>
						<Row>
							<div style={{width: '32%', height: 180, marginRight: 15, marginBottom: 15}}>
								<div className="d-flex">
									<MiniLeftBar process="Chiller" tempPressTimer="100"/>
									<MiniRightBar/>
								</div>
							</div>
							<div style={{width: '32%', height: 180, marginRight: 15, marginBottom: 15}}>
								<div className="d-flex">
									<div className="d-flex" style={{paddingTop: -600, width:'60%', backgroundColor:'#002F49', height: 180, paddingLeft: 10, paddingRight: 10}}>
										<div className="d-flex flex-column" style={{flex: '0 0 70%', paddingTop: 10}}>
											<span style={{color: '#FFFFFF'}}>Metal Detect</span>
											<div style={{height: 30}}></div>
											<DoughnutChart labels={['Defect']} data={chartData}
											               centerText={"10"}
											               showLegend={false}
											/>
										</div>
										<div className="d-flex" style={{flex: '0 0 30%'}}>
											<div className="d-flex flex-column" style={{marginTop: 52}}>
												<div>
													<span style={{color: '#0CD0EB', fontSize: 8}}><FontAwesomeIcon icon={faSquareFull} /></span>
													<span style={{color: '#BEBEBE'}}> Detect</span>
												</div>
													<span style={{color: '#FFFFFF', paddingLeft: 30}}>68</span>
											</div>
										</div>
									</div>
									<MiniRightBar/>
								</div>
							</div>
							<div style={{width: '32%', height: 180, marginBottom: 15, marginRight: 15}}>
								<div className="d-flex">
									<div className="d-flex flex-column" style={{width:'60%', backgroundColor:'#002F49', height: 180, paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
										<span style={{color: '#FFFFFF', marginBottom: 15}}>QIP DEFECT</span>
										<MixedLineBarChart />
									</div>
									<div className="d-flex flex-column" style={{flex: '0 0 40%', paddingTop: 10, backgroundColor:'#082738'}}>
										<span style={{color: '#FFFFFF', paddingLeft: 10}}>Total of Defect</span>
										<div style={{height: 30}}></div>
										<DoughnutChart labels={['Defect']} data={chartData}
										               centerText={"1498"}
										               showLegend={false}
										/>
									</div>
								</div>
							</div>
						</Row>
					</Col>
					<Col md={3} lg={3} style={{marginBottom: 15, marginLeft: -16}}>
						<div className="d-flex" style={{height: '100%'}}>
							<div className="d-flex flex-column" style={{width:'60%', backgroundColor:'#002F49', height: 180, paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
								<span style={{color: '#FFFFFF', marginBottom: 15}}>Packing</span>
								<MixedLineBarChart />
							</div>
							<div className="d-flex flex-column" style={{width:'40%', backgroundColor:'#082738', height:180, paddingTop: 25, paddingLeft: 10, paddingRight: 10}}>
								<div style={{color: '#FFFFFF', paddingTop: 10}}>
									<span style={{color:'#2880E9', fontSize: 8}}><FontAwesomeIcon icon={faSquareFull} /></span> Packing
								</div>
								<div style={{color: '#FFFFFF', paddingTop: 10}}>
									<span style={{color:'#005FCE', fontSize: 8}}><FontAwesomeIcon icon={faSquareFull} /></span> Target
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</Container>

		);
	}
}

export default Overview;

