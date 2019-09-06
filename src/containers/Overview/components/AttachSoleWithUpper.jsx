import {Component}       from "react";
import React             from "react";
import MiniRightBar      from "./MiniRightBar";
import MiniLeftBar       from "./MiniLeftBar";

class AttachSoleWithUpper extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div style={{width: '32%', height: 180, marginBottom: 15, marginRight: 15}}>
				<div className="d-flex">
					<MiniLeftBar process="Attach Sole With Upper" tempPressTimer="011"/>
					<MiniRightBar/>
				</div>
			</div>
		);

	}
}

export default AttachSoleWithUpper;
