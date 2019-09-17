import {Component}     from "react";
import React           from "react";
import DoughnutChart   from "../../../shared/components/chart/DoughnutChart";
import DefectBarChart from "./DefectBarChart";
import {countTotal}   from "../../../shared/utils/Utilities";

class QIPDefect extends Component {
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
		let defectDonutChartData = [{
			data: [0, 0, 0, 0, 0, 0],
			backgroundColor: ['#514EEC', '#8C67F6', '#62A4F0', '#46D6EA', '#C6FCFF', '#FFFFFF']
		}];
		let {qipDefectData} = this.state;
		//let chart   = drawChartItem(qipDefectData);
		let defect1 = 0, defect2 = 0, defect3 = 0, defect4 = 0, defect5 = 0, defect6 = 0, grandTotal = 0;
		try {
			defect1 = countTotal(qipDefectData[3]);
			defect2 = countTotal(qipDefectData[4]);
			defect3 = countTotal(qipDefectData[5]);
			defect4 = countTotal(qipDefectData[6]);
			defect5 = countTotal(qipDefectData[7]);
			defect6 = countTotal(qipDefectData[8]);
			grandTotal = defect1 + defect2 + defect3 + defect4 + defect5 + defect6;
			defectDonutChartData = [{
				data: [defect1, defect2, defect3, defect4, defect5, defect6],
				backgroundColor: ['#514EEC', '#8C67F6', '#62A4F0', '#46D6EA', '#C6FCFF', '#FFFFFF']
			}];
		} catch (e){
			//console.log("Can not count each defect type");
		}

		return (
			<div style={{width: '32%', height: 180, marginBottom: 15, marginRight: 15}}>
				<div className="d-flex">
					<div className="d-flex flex-column" style={{width:'60%', backgroundColor:'#002F49', height: 180, paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
						<span style={{color: '#FFFFFF', marginBottom: 15}}>QIP DEFECT</span>
						<DefectBarChart chartData={qipDefectData}  showLegend={false} />
					</div>
					<div className="d-flex flex-column" style={{flex: '0 0 40%', paddingTop: 10, backgroundColor:'#082738'}}>
						<span style={{color: '#FFFFFF', paddingLeft: 10}}>Total of Defect</span>
						<div style={{height: 22}}></div>
						<DoughnutChart labels={['Defect']} data={defectDonutChartData}
						               centerText={grandTotal.toString()}
						               showLegend={false}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default QIPDefect;
