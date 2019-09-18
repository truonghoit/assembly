import {Component}                                              from "react";
import React                                                    from "react";
import MixedLineBarChart                                        from "../../../shared/components/chart/MixedLineBarChart";
import MiniRightBar                                             from "./MiniRightBar";
import {Col}                                                    from "reactstrap";
import {countPrep, countCuring, drawChartItem, countQtyPercent} from "./sharedFunction";

class PreStiching extends Component {
	constructor(props) {
		super(props);
		this.state = {
			preStichingData: [],
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		if (this.props.preStichingData != prevProps.preStichingData){
			let {preStichingData} = this.props;
			this.setState((state, props) => ({
				preStichingData: preStichingData,
			}));
		}
	}

	render(){
		let {preStichingData} = this.state;
		let chart   = drawChartItem(preStichingData);
		let prep    = countPrep(preStichingData);
		let curing  = countCuring(preStichingData);
		let cycle   = prep + curing;
		let qty     = countQtyPercent(preStichingData);
		return (
			<div style={{backgroundColor: 'purple', width: '32%', height: 180, marginBottom: 15}}>
				<div className="d-flex">
					<div className="d-flex flex-column" style={{width:'60%', backgroundColor:'#002F49', height: 180, paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
						<span style={{color: '#FFFFFF', marginBottom: 15}}>Pre. Stiching</span>
						{chart}
					</div>
					<MiniRightBar prep={prep} curing={curing} cycle={cycle} qty={qty}/>
				</div>
			</div>
		);

	}
}

export default PreStiching;
