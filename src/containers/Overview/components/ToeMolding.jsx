import {Component}       from "react";
import React             from "react";
import MiniRightBar      from "./MiniRightBar";
import MiniLeftBar       from "./MiniLeftBar";
import {handleLeftPanel} from "./sharedFunction";

class ToeMolding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toeMoldingData: [],
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		if (this.props.toeMoldingData != prevProps.toeMoldingData){
			let {toeMoldingData} = this.props;
			this.setState((state, props) => ({
				toeMoldingData: toeMoldingData,
			}));
		}
	}

	render(){
		let {toeMoldingData} = this.state;
		let tempPresTimeItem = handleLeftPanel(toeMoldingData);
		return (
			<div style={{width: '32%', height: 180, marginRight: 15, marginBottom: 15}}>
				<div className="d-flex">
					<MiniLeftBar process="Toe Molding" tempPressTimer="111"
					             tempGreen = {tempPresTimeItem.tempGreen}
					             tempYellow = {tempPresTimeItem.tempYellow}
					             tempRed = {tempPresTimeItem.tempRed}
					             presGreen = {tempPresTimeItem.presGreen}
					             presYellow = {tempPresTimeItem.presYellow}
					             presRed = {tempPresTimeItem.presRed}
					             timerGreen = {tempPresTimeItem.timerGreen}
					             timerYellow = {tempPresTimeItem.timerYellow}
					             timerRed = {tempPresTimeItem.timerRed} />
					<MiniRightBar/>
				</div>
			</div>
		);

	}
}

export default ToeMolding;
