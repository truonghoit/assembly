import {Component}       from "react";
import React             from "react";
import MiniRightBar      from "./MiniRightBar";
import MiniLeftBar       from "./MiniLeftBar";
import {handleLeftPanel} from "./sharedFunction";

class AttachSoleWithUpper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attachSoleWithUpperData: [],
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot){
		if (this.props.attachSoleWithUpperData != prevProps.attachSoleWithUpperData){
			let {attachSoleWithUpperData} = this.props;
			this.setState((state, props) => ({
				attachSoleWithUpperData: attachSoleWithUpperData,
			}));
		}
	}

	render(){
		let {attachSoleWithUpperData} = this.state;
		let tempPresTimeItem = handleLeftPanel(attachSoleWithUpperData);
		return (
			<div style={{width: '32%', height: 180, marginBottom: 15, marginRight: 15}}>
				<div className="d-flex">
					<MiniLeftBar process="Attach Sole With Upper" tempPressTimer="011"
					             tempGreen = {tempPresTimeItem.tempGreen}
					             tempYellow = {tempPresTimeItem.tempYellow}
					             tempRed = {tempPresTimeItem.tempRed}
					             presGreen = {tempPresTimeItem.presGreen}
					             presYellow = {tempPresTimeItem.presYellow}
					             presRed = {tempPresTimeItem.presRed}
					             timerGreen = {tempPresTimeItem.timerGreen}
					             timerYellow = {tempPresTimeItem.timerYellow}
					             timerRed = {tempPresTimeItem.timerRed}/>
					<MiniRightBar/>
				</div>
			</div>
		);

	}
}

export default AttachSoleWithUpper;
