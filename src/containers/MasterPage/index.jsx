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
			submissionState: -1,    // -1: Submit/Save, 0: Submitting/Saving, 1: Submitted/Saved
		};
	}

	handleSubmit = (values) => {
		this.setState({
			submissionState: 0,
		});

		event.preventDefault();

		const {field} = MASTER_FORM_CONSTANTS;
		let definition_value = (values[field.temperature] ? "1" : "0")
			+ (values[field.pressure] ? "1" : "0")
			+ (values[field.curingTime] ? "1" : "0");

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
					submissionState: 1,
				});
				if (!this.state.editMode) { // Is in Insert Mode
					let gotError = false;
					response.data.data.map(rowData => {
						if (rowData.outvalue) {    // Got Error/Duplicate Mas Code Found
							gotError = true;
						}
					});
					if (gotError) {
						this.setState({
							formData: {
								...this.state.formData,
								[field.hiddenMasCdDuplicatedChecker]: true,
							}
						});
					} else {
						this.setState({
							tableData: response.data.data.map(rowData => ({
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
							}))
						});
					}
				} else {
					this.setState({
						tableData: response.data.data.map(rowData => ({
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
						}))
					});
				}
				setTimeout(() => {
					this.setState({
						submissionState: -1,
						editMode: false,
					});
				}, 1000);
			}).catch(reason => {
				console.log("Error: ", reason);
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
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	};

	fillForm = (selectedRow) => {
		this.setState({
			formData: selectedRow,
			editMode: true,
			submissionState: -1,
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
		let {parentCodeOptions, categoryCodeOptions, tableData, formData, editMode, submissionState} = this.state;
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
							            submissionState={submissionState}/>
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

