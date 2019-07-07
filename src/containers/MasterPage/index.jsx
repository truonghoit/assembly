import React, {Component} from 'react';
import {Container, Row} from 'reactstrap';
import MasterForm from "./components/MasterForm";
import callAxios from "../../services/api";

class ExamplePage extends Component {
	handleSubmit = (values) => {
		event.preventDefault();
		let defintion_value = "" + (values.temperature?1:0) + (values.pressure?1:0) + (values.curringTime?1:0);
		console.log("defintion_value: ", defintion_value);
		console.log("values: ", values);

		let method = 'POST';
		let url = '/api/asc/mascode';
		let param = {
			"status" : "INSERT",
			"mas_cd" : "20000",
			"cate_cd" : 101,
			"cate_cd_nm" : "nha may 3",
			"parent_mas_cd" : "",
			"processing_seq" : 0,
			"defintion_value" : 0,
			"virtual_yn" : 1,
			"active_yn" : 1,
			"sys_code_yn" : 1,
			"username": "hcmthv",
			"remark" : "testing . "
		};

		/*let intervalRequest = setInterval(() => callAxios(method, url, param), 1000);
		setTimeout(()=> {
			clearInterval(intervalRequest);
		}, 10000);*/
		callAxios(method, url, param).then(response => {
			console.log("response:", response);
		});
	}

	resetForm = () => {	}

	render() {
		return (
			<Container className="dashboard">
				<Row>
					<MasterForm onSubmit={this.handleSubmit} onReset={this.resetForm}/>
				</Row>
			</Container>
		);
	}
}

export default (ExamplePage);
