import {Component}       from "react";
import React             from "react";
import DoughnutChart from "../../../shared/components/chart/DoughnutChart";
import MiniRightBar      from "./MiniRightBar";
import MiniLeftBar       from "./MiniLeftBar";
import {FontAwesomeIcon}        from "@fortawesome/react-fontawesome";
import {faSquareFull} from '@fortawesome/free-solid-svg-icons'

class MetalDetect extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		let chartData = [{
			data: [50, 50],
			backgroundColor: ['#0CD0EB', '#005FCE']
		}];
		return (
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
		);
	}
}

export default MetalDetect;
