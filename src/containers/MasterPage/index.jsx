import React, {Component} from 'react';
import {Container, Row} from 'reactstrap';
import MasterForm from "./components/MasterForm";

class ExamplePage extends Component {
	showResults = (values) => {
		event.preventDefault();
		let defintion_value = "" + (values.temperature?1:0) + (values.pressure?1:0) + (values.curringTime?1:0);
		console.log("defintion_value: ", defintion_value);
		console.log("values: ", values);
	}

	resetForm = () => {

	}

	render() {
		return (
			<Container className="dashboard">
				<Row>
					<MasterForm onSubmit={this.showResults} onReset={this.resetForm}/>
				</Row>
			</Container>
		);
	}
}

export default (ExamplePage);
