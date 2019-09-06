import {Component}              from "react";
import React                    from "react";
import DoughnutChart            from "../../../shared/components/chart/DoughnutChart";
import {drawChartItem}          from "./sharedFunction";

class QIPDetect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qipDefectData: [],
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		if (this.props.qipDefectData != prevProps.qipDefectData){
			let {qipDefectData} = this.props;
			this.setState((state, props) => ({
				qipDefectData: qipDefectData,
			}));
		}
	}

	render(){
		let chartData = [{
			data: [50, 50],
			backgroundColor: ['#0CD0EB', '#005FCE']
		}];
		let {qipDefectData} = this.state;
		let chart   = drawChartItem(qipDefectData);
		return (
			<div style={{width: '32%', height: 180, marginBottom: 15, marginRight: 15}}>
				<div className="d-flex">
					<div className="d-flex flex-column" style={{width:'60%', backgroundColor:'#002F49', height: 180, paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
						<span style={{color: '#FFFFFF', marginBottom: 15}}>QIP DEFECT</span>
						{chart}
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
		);
	}
}

export default QIPDetect;
