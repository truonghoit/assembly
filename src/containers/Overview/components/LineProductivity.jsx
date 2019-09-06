import {Component}       from "react";
import React             from "react";
import {Col, Container, Progress, Row} from 'reactstrap';

class LineProductivity extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
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
				<div className="progress-wrap progress-wrap--small progress-wrap--alarm-green progress-wrap--label-top mt-5">
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
				<div className="progress-wrap progress-wrap--small progress-wrap--alarm-green progress-wrap--label-top  mt-5">
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
				<div className="progress-wrap progress-wrap--small progress-wrap--alarm-green progress-wrap--label-top  mt-3">
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
				<div className="progress-wrap progress-wrap--small progress-wrap--alarm-green progress-wrap--label-top  mt-3">
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
		);

	}
}

export default LineProductivity;
