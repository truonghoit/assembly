import React, {Component} from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import MasterForm, {MASTER_FORM_CONSTANTS} from "./components/MasterForm";
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
		let {initial} = MASTER_FORM_CONSTANTS.submissionState;
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
			submissionState: initial,    // -1: Failed, 0: Submit/Save, 1: Submitting/Saving, 2: Submitted/Saved
			connectionError: '',
		};
	}

	handleSubmit = (values) => {
		let {failed, initial, onGoing, done} = MASTER_FORM_CONSTANTS.submissionState;
		this.setState({
			submissionState: onGoing,
		});

		event.preventDefault();

		const {field} = MASTER_FORM_CONSTANTS;
		let definition_value = `${values[field.temperature]}${values[field.pressure]}${values[field.curingTime]}`;

		let method = 'POST';
		let url = '/api/asc/mascode';
		let param = {
			"status": this.state.editMode ? "UPDATE" : "INSERT",
			"mas_cd": values[field.masCd],
			"cate_cd": values[field.catCd],
			"mas_cd_nm": values[field.masCdNm],
			"parent_mas_cd": values[field.parentMasCd],
			"processing_seq": values[field.processingSeq],
			"definition_value": definition_value,
			"virtual_yn": values[field.virtualYn],
			"active_yn": values[field.activeYn],
			"sys_code_yn": values[field.sysCodeYn],
			"username": "truongho",
			"remark": values[field.description]
		};
		setTimeout(() => {
			callAxios(method, url, param).then(response => {
				//Update parent combobox items
				if (response) {
					let parentArray = this.state.parentCodeOptions;
					parentArray.shift();//remove first element
					parentArray.unshift({//add the new created element into combo box
						value: "",
						label: "---",
					}, {
						value: values[field.masCd],
						label: values[field.masCdNm],
					});
					this.setState({
						parentCodeOptions: parentArray,
					});
				} else {
					this.setState({
						submissionState: failed,
					})
				}
				let gotError = false;
				let tableData = response.data.data.map(rowData => {
					if (rowData.outvalue) {    // Got Error/Duplicate Mas Code Found
						gotError = true;
					}
					return {
						[field.masCd]: rowData.mas_cd,
						[field.masCdNm]: rowData.mas_cd_nm,
						[field.catCdNm]: rowData.cate_nm,
						[field.catCd]: rowData.cate_cd,
						[field.parentMasNm]: rowData.parent_cd_nm,
						[field.parentMasCd]: rowData.parent_mas_cd,
						[field.processingSeq]: rowData.processing_seq,
						[field.definitionValue]: rowData.definition_value,
						[field.virtualYn]: rowData.virtual_yn,
						[field.activeYn]: rowData.active_yn,
						[field.sysCodeYn]: rowData.sys_code_yn,
						[field.description]: rowData.remark,
					};
				});
				if (!this.state.editMode && gotError) { // Is in Insert Mode and Duplicated Mas Code found
					this.setState({
						formData: {
							...this.state.formData,
							[field.hiddenMasCdDuplicatedChecker]: true,
						},
						submissionState: failed,
					});
				} else {    // Is in Edit Mode
					this.setState({
						tableData: tableData,
						submissionState: done,
					});
				}
				setTimeout(() => {
					this.setState({
						submissionState: initial,
						editMode: false,
					});
				}, 1000);
			}).catch(reason => {
				console.log("Error: ", reason);
				this.setState({
					submissionState: failed,
					connectionError: 'Cannot connect to Server',
				});
				setTimeout(() => {
					this.setState({
						submissionState: initial,
						connectionError: '',
					});
				}, 2000);
			})
		}, 1000);
	};

	loadComboBoxes = () => {
		let method = 'POST';
		let url = ASSEMBLY_API + CATEGORY_ROUTE;
		let param = {
			"dropdownlist-name": "cate"
		};

		callAxios(method, url, param).then(response => {
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
		}).catch(reason => console.log("Error: ", reason));

		url = ASSEMBLY_API + PARENT_ROUTE;
		param = {
			"dropdownlist-name": "parent"
		};

		callAxios(method, url, param).then(response => {
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
		}).catch(reason => console.log("Error: ", reason));
	};

	loadDataTable = () => {
		let method = 'POST';
		let url = ASSEMBLY_API + MAS_CODE_ROUTE;

		callAxios(method, url, {}).then(response => {
			let responseArray = response.data.data;
			let tableData = [];
			const {field} = MASTER_FORM_CONSTANTS;
			for (let i = 0; i < responseArray.length; i++) {
				let item = {
					[field.masCd]: responseArray[i].mas_cd,
					[field.masCdNm]: responseArray[i].mas_cd_nm,
					[field.catCdNm]: responseArray[i].cate_nm,
					[field.catCd]: responseArray[i].cate_cd,
					[field.parentMasNm]: responseArray[i].parent_cd_nm,
					[field.parentMasCd]: responseArray[i].parent_mas_cd,
					[field.processingSeq]: responseArray[i].processing_seq,
					[field.definitionValue]: responseArray[i].definition_value,
					[field.virtualYn]: responseArray[i].virtual_yn,
					[field.activeYn]: responseArray[i].active_yn,
					[field.sysCodeYn]: responseArray[i].sys_code_yn,
					[field.description]: responseArray[i].remark,
				};
				tableData.push(item);
			}
			this.setState({
				tableData: tableData,
			});
		}).catch(reason => console.log("Error: ", reason));
	};

	fillForm = (selectedRow) => {
		this.setState({
			formData: selectedRow,
			editMode: true,
			submissionState: MASTER_FORM_CONSTANTS.submissionState.initial,
		});
	};

	onReset = () => {
		this.setState({
			formData: {},
			editMode: false,
		})
	};

	componentDidMount() {
		this.loadComboBoxes();
		this.loadDataTable();
	}

	render() {
		let {
			parentCodeOptions, categoryCodeOptions,
			tableData, formData,
			editMode, submissionState, connectionError
		} = this.state;
		return (
			<Container className="dashboard">
				<Card>
					<CardBody>
						<Row>
							<MasterForm parentCodeOptions={parentCodeOptions}
							            categoryCodeOptions={categoryCodeOptions}
							            onSubmit={this.handleSubmit}
							            formData={formData}
							            onReset={this.onReset}
							            editMode={editMode}
							            submissionState={submissionState}
							            connectionError={connectionError}/>
						</Row>
						<h1 style={{height: 50}}/>
						<Row>
							<Col md={12} lg={12}>
								<DataTable tableData={tableData} fillForm={this.fillForm}/>
							</Col>
						</Row>
					</CardBody>
				</Card>
			</Container>
		);
	}
}

export default reduxForm({
	form: MASTER_FORM_CONSTANTS.masterFormName,
})(MasterPage);

