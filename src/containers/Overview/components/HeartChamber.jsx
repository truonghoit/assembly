import {Component}                         from "react";
import React                               from "react";
import MiniRightBar                        from "./MiniRightBar";
import MiniLeftBar                         from "./MiniLeftBar";
import {handleLeftPanel, handleRightPanel} from "./sharedFunction";

class HeartChamber extends Component {
	constructor(props) {
		super(props);
		this.state = {
			heatChamberData: [],
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		if (this.props.heatChamberData != prevProps.heatChamberData){
			let {heatChamberData} = this.props;
			this.setState((state, props) => ({
				heatChamberData: heatChamberData,
			}));
		}
	}

	render(){
		let {heatChamberData} = this.state;
		let tempPresTimeItem = handleLeftPanel(heatChamberData);
		let rightPanelItem = handleRightPanel(heatChamberData);
		return (
			<div style={{width: '32%', height: 180, marginRight: 15, marginBottom: 15}}>
				<div className="d-flex">
					<MiniLeftBar process="Heat Chamber" tempPressTimer="100"
					             tempGreen = {tempPresTimeItem.tempGreen}
					             tempYellow = {tempPresTimeItem.tempYellow}
					             tempRed = {tempPresTimeItem.tempRed}
					             presGreen = {tempPresTimeItem.presGreen}
					             presYellow = {tempPresTimeItem.presYellow}
					             presRed = {tempPresTimeItem.presRed}
					             timerGreen = {tempPresTimeItem.timerGreen}
					             timerYellow = {tempPresTimeItem.timerYellow}
					             timerRed = {tempPresTimeItem.timerRed} />
					<MiniRightBar qty={rightPanelItem.qty} prep={rightPanelItem.prep} curing={rightPanelItem.curing} cycle={rightPanelItem.cycle}/>
				</div>
			</div>
		);

	}
}

export default HeartChamber;
