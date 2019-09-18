import {Component}       from "react";
import React             from "react";
import MiniRightBar      from "./MiniRightBar";
import MiniLeftBar       from "./MiniLeftBar";
import {handleLeftPanel, handleRightPanel} from "./sharedFunction";

class BackpackMolding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			backPackMoldingData: [],
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		if (this.props.backPackMoldingData != prevProps.backPackMoldingData){
			let {backPackMoldingData} = this.props;
			this.setState((state, props) => ({
				backPackMoldingData: backPackMoldingData,
			}));
		}
	}

	render(){
		let {backPackMoldingData} = this.state;
		let tempPresTimeItem = handleLeftPanel(backPackMoldingData);
		let rightPanelItem = handleRightPanel(backPackMoldingData);
		return (
			<div style={{width: '32%', height: 180, marginRight: 15, marginBottom: 15}}>
				<div className="d-flex">
					<MiniLeftBar process="Backpack Molding" tempPressTimer="111"
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

export default BackpackMolding;