import {Component}       from "react";
import React             from "react";
import MiniRightBar      from "./MiniRightBar";
import MiniLeftBar       from "./MiniLeftBar";

class Cememting extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div style={{width: '32%', height: 180, marginRight: 15, marginBottom: 15}}>
				<div className="d-flex">
					<MiniLeftBar process="Cementing" tempPressTimer="100"/>
					<MiniRightBar/>
				</div>
			</div>
		);

	}
}

export default Cememting;
