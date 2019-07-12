import React, {Component} from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import MasterForm from "./components/MasterForm";
import callAxios from "../../services/api";
import {
	ASSEMBLY_API,
	CATEGORY_ROUTE,
	MAS_CODE_ROUTE,
	PARENT_ROUTE
} from "../../constants/constants";
import DataTable from "./components/DataTable";
import {reduxForm} from "redux-form";

class MasterPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryCodeOptions: [{
				value: "",
				label: "---",
			}],
			parentCodeOptions: [{
				value: "",
				label: "---",
			}],
			formData: {},
			editMode: false,
			submittingState: -1,    // -1: Submit/Save, 0: Submitting/Saving, 1: Submitted/Saved
		};
	}

	handleSubmit = (values) => {
		this.setState({
			submittingState: 0,
		});

		event.preventDefault();
		let definition_value = (values.temperature ? "1" : "0") + (values.pressure ? "1" : "0") + (values.curringTime ? "1" : "0");

		let method = 'POST';
		let url = '/api/asc/mascode';
		let param = {
			"status": this.state.editMode ? "UPDATE" : "INSERT",
			"mas_cd": values.mas_cd,
			"cate_cd": values.cate_cd,
			"mas_cd_nm": values.mas_cd_nm,
			"parent_mas_cd": values.parent_mas_cd,
			"processing_seq": values.processing_seq,
			"definition_value": definition_value,
			"virtual_yn": values.virtual_yn,
			"active_yn": values.active_yn,
			"sys_code_yn": values.sys_code_yn,
			"username": "truongho",
			"remark": values.remark
		};
		setTimeout(() => {
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
					submittingState: 1,
				});
				setTimeout(() => {
					this.setState({
						submittingState: -1,
						editMode: false,
					});
				}, 1000);
			})
		}, 1000);
	};

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
				});
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	};

	loadDataTable = () => {
		let method = 'POST';
		let url = ASSEMBLY_API + MAS_CODE_ROUTE;

		callAxios(method, url, {}).then(response => {
			try {
				let responseArray = response.data.data;
				let dataArray = [];
				for (let i = 0; i < responseArray.length; i++) {
					let item = {
						mas_cd: responseArray[i].mas_cd,
						mas_cd_nm: responseArray[i].mas_cd_nm,
						cate_cd_nm: responseArray[i].cate_nm,
						cate_cd: responseArray[i].cate_cd,
						parent_mas_name: responseArray[i].parent_cd_nm,
						parent_mas_cd: responseArray[i].parent_mas_cd,
						processing_seq: responseArray[i].processing_seq,
						definition_value: responseArray[i].definition_value,
						virtual_yn: responseArray[i].virtual_yn,
						active_yn: responseArray[i].active_yn,
						sys_code_yn: responseArray[i].sys_code_yn,
						remark: responseArray[i].remark,
					};
					dataArray.push(item);
				}
				this.setState({
					dataArray: dataArray,
				});
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	};

	fillForm = (selectedRow) => {
		this.setState({
			formData: selectedRow,
			editMode: true,
			submittingState: -1,
		});
	};

	onEditModeChange = (editMode) => {
		this.setState({
			editMode: editMode,
		})
	};

	componentDidMount() {
		this.loadCombo();
		this.loadDataTable();
	}

	render() {
		let {parentCodeOptions, categoryCodeOptions, dataArray, formData, editMode, submittingState} = this.state;
		return (
			<Container className="dashboard">
				<Card>
					<CardBody>
						<Row>
							<MasterForm parentCodeOptions={parentCodeOptions}
							            categoryCodeOptions={categoryCodeOptions}
							            onSubmit={this.handleSubmit}
							            formData={formData}
							            onEditModeChange={this.onEditModeChange}
							            editMode={editMode} submittingState={submittingState}/>
						</Row>
						<h1 style={{height: 50}}/>
						<Row>
							<Col md={12} lg={12}>
										<DataTable dataArray={dataArray} fillForm={this.fillForm}/>

							</Col>
						</Row>
					</CardBody>
				</Card>
			</Container>
		);
	}
}

export default reduxForm({
	form: 'MasterForm',
})(MasterPage);

