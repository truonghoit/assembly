import {Col, Progress}   from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareFull}    from "@fortawesome/free-solid-svg-icons";
import {Component} from "react";
import React from "react";

class MiniRightBar extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div style={{width:'40%', backgroundColor:'#082738', height:180, paddingTop: 25, paddingLeft: 10, paddingRight: 10}}>
				<div className="progress-wrap progress-wrap--small progress-wrap--alarm-green progress-wrap--label-top">
					<div className="d-flex">
						<Col md={9} lg={9} style={{marginLeft: -15, color: '#FFFFFF'}}>
							QTY
						</Col>
						<Col md={3} lg={3} style={{color: '#FFFFFF'}}>
							92%
						</Col>
					</div>
					<Progress value={92}>
					</Progress>
				</div>
				<div className="d-flex flex-wrap">
					<Col md={9} lg={9} style={{marginLeft: -15, color: '#FFFFFF'}}>
						Cycle
					</Col>
					<Col md={3} lg={3} style={{color: '#FFFFFF'}}>
						72s
					</Col>
					<Col md={9} lg={9} style={{marginLeft: -15, color: '#FFFFFF', paddingTop: 10}}>
						<span style={{color:'#2880E9', fontSize: 8}}><FontAwesomeIcon icon={faSquareFull} /></span> Prep
					</Col>
					<Col md={3} lg={3} style={{color: '#FFFFFF', paddingTop: 10}}>
						27s
					</Col>
					<Col md={9} lg={9} style={{marginLeft: -15, color: '#FFFFFF', paddingTop: 5}}>
						<span style={{color:'#2880E9', fontSize: 8}}><FontAwesomeIcon icon={faSquareFull} /></span> Curing
					</Col>
					<Col md={3} lg={3} style={{color: '#FFFFFF', paddingTop: 5}}>
						45s
					</Col>
				</div>
			</div>
		);

	}
}

export default MiniRightBar;
