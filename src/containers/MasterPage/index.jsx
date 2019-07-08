import React, {Component} from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import MasterForm from "./components/MasterForm";
import callAxios from "../../services/api";
import {ASSEMBLY_API, CATEGORY_ROUTE, PARENT_ROUTE} from "../../constants/constants";

class ExamplePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			categoryCodeOptions: [{
				value: "",
				label: "---",
			}],
			parentCodeOptions: [{
				value: "",
				label: "---",
			}]
		};
	}

	handleSubmit = (values) => {
		event.preventDefault();
		let defintion_value = (values.temperature?"1":"0") + (values.pressure?"1":"0") + (values.curringTime?"1":"0");

		let method = 'POST';
		let url = '/api/asc/mascode';
		let param = {
			"status" : "INSERT",
			"mas_cd" : values.mas_cd,
			"cate_cd" : values.cate_cd_nm.value,
			"mas_cd_nm" : values.mas_cd_nm,
			"parent_mas_cd" : values.parent_mas_name?values.parent_mas_name.value:'',
			"processing_seq" : values.processing_seq,
			"defintion_value" : defintion_value,
			"virtual_yn" : values.virtual_yn,
			"active_yn" : values.active_yn,
			"sys_code_yn" : values.sys_code_yn,
			"username": "truongho",
			"remark" : values.remark
		};

		callAxios(method, url, param).then(response => {
			//Update parent combobox items
			let parentArray = this.state.parentCodeOptions;
			parentArray.shift();//remove first element
			parentArray.unshift({//add the new created element into combo box
				value: "",
				label: "---",
			}, {
				value: values.mas_cd,
				label: values.mas_cd_nm,
			});
			this.setState({
				parentCodeOptions: parentArray,
			});
		});
	}

	loadCombo = () => {
		let method = 'POST';
		let url = ASSEMBLY_API + CATEGORY_ROUTE;
		let param = {
			"dropdownlist-name": "cate"
		};

		callAxios(method, url, param).then(response => {
			try {
				this.setState({
					categoryCodeOptions: [{
						value: "",
						label: "---",
					}].concat(
						response.data.data.map(categoryCode => ({
							value: categoryCode.code.toString(),
							label: categoryCode.name.toString(),
						}))
					),
					selectedCategoryCode: {
						value: "",
						label: "",
					}
				});
			} catch (e) {
				console.log("Error: ", e);
			}
		});

		url = ASSEMBLY_API + PARENT_ROUTE;
		param = {
			"dropdownlist-name": "parent"
		};

		callAxios(method, url, param).then(response => {
			try {
				this.setState({
					parentCodeOptions: [{
						value: "",
						label: "---",
					}].concat(
						response.data.data.map(parentCode => ({
							value: parentCode.code.toString(),
							label: parentCode.name.toString(),
						}))
					),
					selectedParentCode: {
						value: "",
						label: "",
					}
				});
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	resetForm = () => {	}

	componentDidMount(){
		this.loadCombo();
	}

	render() {
		let {parentCodeOptions, categoryCodeOptions} = this.state;
		return (
			<Container className="dashboard">
				<Row>
					<MasterForm onReset={this.resetForm} parentCodeOptions={parentCodeOptions} categoryCodeOptions={categoryCodeOptions} onSubmit={this.handleSubmit} />
				</Row>
			</Container>
		);
	}
}

export default (ExamplePage);
