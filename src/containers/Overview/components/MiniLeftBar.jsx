import {Col, Progress}   from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle}    from "@fortawesome/free-solid-svg-icons";
import {Component} from "react";
import React from "react";

class MiniLeftBar extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		let {process, tempPressTimer} = this.props;
		let temperature = tempPressTimer.charAt(0);
		let pressure    = tempPressTimer.charAt(1);
		let timer       = tempPressTimer.charAt(2);
		return (
			<div className="d-flex flex-column" style={{width:'60%', backgroundColor:'#002F49', height:180, paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
				<span style={{color: '#FFFFFF', marginBottom: 15}}>{process}</span>
				{
					temperature==="1"?
						<div className="d-flex flex-row">
							<div style={{color: '#FFFFFF', flex: '0 0 40%'}}>
								Temperature
							</div>
							<div style={{marginLeft: 10, color: '#FFFFFF', flex: '0 0 20%'}}>
								<span style={{color:'#03CF65', fontSize: 10}}>157 <FontAwesomeIcon icon={faCircle} /></span>
							</div>
							<div style={{color: '#FFFFFF', flex: '0 0 20%'}}>
								<span style={{color:'#FFD44F', fontSize: 10}}>12 <FontAwesomeIcon icon={faCircle} /></span>
							</div>
							<div style={{color: '#FFFFFF', flex: '0 0 20%'}}>
								<span style={{color:'#F84E4E', fontSize: 10}}>3 <FontAwesomeIcon icon={faCircle} /></span>
							</div>
						</div>
					: ''
				}
				{
					pressure==="1"?
						<div className="d-flex flex-row" style={{marginTop: 15}}>
							<div style={{color: '#FFFFFF', flex: '0 0 40%'}}>
								Pressure
							</div>
							<div style={{marginLeft: 10, color: '#FFFFFF', flex: '0 0 20%'}}>
								<span style={{color:'#03CF65', fontSize: 10}}>157 <FontAwesomeIcon icon={faCircle} /></span>
							</div>
							<div style={{color: '#FFFFFF', flex: '0 0 20%'}}>
								<span style={{color:'#FFD44F', fontSize: 10}}>12 <FontAwesomeIcon icon={faCircle} /></span>
							</div>
							<div style={{color: '#FFFFFF', flex: '0 0 20%'}}>
								<span style={{color:'#F84E4E', fontSize: 10}}>3 <FontAwesomeIcon icon={faCircle} /></span>
							</div>
						</div>
					: ''
				}
				{
					timer==="1"?
						<div className="d-flex flex-row" style={{marginTop: 15}}>
							<div style={{color: '#FFFFFF', flex: '0 0 40%'}}>
								Timer
							</div>
							<div style={{marginLeft: 10, color: '#FFFFFF', flex: '0 0 20%'}}>
								<span style={{color:'#03CF65', fontSize: 10}}>157 <FontAwesomeIcon icon={faCircle} /></span>
							</div>
							<div style={{color: '#FFFFFF', flex: '0 0 20%'}}>
								<span style={{color:'#FFD44F', fontSize: 10}}>12 <FontAwesomeIcon icon={faCircle} /></span>
							</div>
							<div style={{color: '#FFFFFF', flex: '0 0 20%'}}>
								<span style={{color:'#F84E4E', fontSize: 10}}>3 <FontAwesomeIcon icon={faCircle} /></span>
							</div>
						</div>
					: ''
				}


			</div>
		);

	}
}

export default MiniLeftBar;
