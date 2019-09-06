import {Component}       from "react";
import React             from "react";
import MiniRightBar      from "./MiniRightBar";
import MiniLeftBar       from "./MiniLeftBar";

class ToeMolding extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div style={{width: '32%', height: 180, marginRight: 15, marginBottom: 15}}>
				<div className="d-flex">
					<MiniLeftBar process="Toe Molding" tempPressTimer="111"/>
					<MiniRightBar/>
				</div>
			</div>
		);

	}
}

export default ToeMolding;
