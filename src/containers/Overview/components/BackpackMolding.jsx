import {Component}       from "react";
import React             from "react";
import MiniRightBar      from "./MiniRightBar";
import MiniLeftBar       from "./MiniLeftBar";

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
		console.log("backPackMoldingData: ", backPackMoldingData);
		return (
			<div style={{width: '32%', height: 180, marginRight: 15, marginBottom: 15}}>
				<div className="d-flex">
					<MiniLeftBar process="Backpack Molding" tempPressTimer="111"/>
					<MiniRightBar/>
				</div>
			</div>
		);

	}
}

export default BackpackMolding;
