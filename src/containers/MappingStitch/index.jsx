import React, {Component}             from "react";
import {Col, Container, Row}          from "reactstrap";
import MappingStitchForm              from "./components/MappingStitchForm";
import DataTable                      from "./components/DataTable";
import {ASSEMBLY_API, MAPPING_STITCH, MAPPING_STITCH_IU} from "../../constants/urlConstants";
import callAxios                      from "../../services/api";
import MAPPING_STITCH_CONSTANTS       from "./constants";
import {changeDateToUnix}            from "../../shared/utils/Utilities";

class MappingStitch extends Component {
	constructor(props){
		super(props);
		let {initial} = MAPPING_STITCH_CONSTANTS.submissionState;
		this.mainTableRef = React.createRef();
		this.state = {
			tableData: [],
			formData           : {},
			editMode           : false,
			submissionState    : initial,    // -1: Failed, 0: Submit/Save, 1: Submitting/Saving, 2: Submitted/Saved
			connectionError    : '',
		}
	}

	componentDidMount() {
		this.getStitchList();
	}

	fillForm = (selectedRow) => {
		const {field} = MAPPING_STITCH_CONSTANTS;

		this.setState({
			formData       : {
				...selectedRow,
			},
			editMode       : true,
			submissionState: MAPPING_STITCH_CONSTANTS.submissionState.initial,
		});
	};

	onReset = () => {
		this.deselectRow();
		this.setState({
			formData: {},
			editMode: false,
		});
	};

	handleSubmit = (values) => {
		let {failed, initial, onGoing, done} = MAPPING_STITCH_CONSTANTS.submissionState;
		this.setState({
			submissionState: onGoing,
		});
		event.preventDefault();

		const {field}        = MAPPING_STITCH_CONSTANTS;

		let method = 'POST';
		let url    = ASSEMBLY_API + MAPPING_STITCH_IU;
		let param  = {
			"status"            : this.state.editMode ? "UPDATE" : "INSERT",
			"mac_address"       : values[field.macAddress],
			"mapping_seq"       : "0",
			"factory_cd"        : values[field.factoryCode],
			"line_cd"           : values[field.lineCode],
			"process_cd"        : values[field.processCode],
			"position_no"       : values[field.posittionCode],
			"active_yn"         : values[field.active]?"1":"0",
			"description"       : values[field.description],
			"entry_date"        : changeDateToUnix(values[field.entryDate]),
			"rtn_value"         : ""
		};
		callAxios(method, url, param).then(response => {
			this.setState({
				formData       : {},
				//tableData      : tableData,
				submissionState: done,
			});
			let gotError  = false;
			let tableData = response.data.data.map(rowData => {
				if (rowData.outvalue) {    // Got Error/Duplicated Mas Code Found
					gotError = true;
				}
				return {
					"mac_address"       : rowData[field.macAddress],
					"mapping_seq"       : "0",
					"factory_cd"        : rowData[field.factoryCode],
					"line_cd"           : rowData[field.lineCode],
					"process_cd"        : rowData[field.processCode],
					"position_no"       : rowData[field.posittionCode],
					"active_yn"         : rowData[field.active]?"1":"0",
					"description"       : rowData[field.description],
					"entry_date"        : changeDateToUnix(rowData[field.entryDate]),
					"rtn_value"         : ""
				};
			});
			if (!this.state.editMode && gotError) { // Is in Insert Mode and Duplicated Mas Code found
				console.log("Insert duplicated");
				console.log("values: ", values);
				this.setState({
					formData       : {
						...this.state.formData,
						"status"            : this.state.editMode ? "UPDATE" : "INSERT",
						"mac_address"       : values[field.macAddress],
						"mapping_seq"       : "0",
						"factory_cd"        : values[field.factoryCode],
						"line_cd"           : values[field.lineCode],
						"process_cd"        : values[field.processCode],
						"position_no"       : values[field.posittionCode],
						"active_yn"         : values[field.active]?"1":"0",
						"description"       : values[field.description],
						"entry_date"        : changeDateToUnix(values[field.entryDate]),
						"rtn_value"         : ""
					},
					submissionState: failed,
				});
			} else {    // Is in Insert OR Edit Mode and got NO error
				console.log("insert successfully");
				this.setState({
					formData       : {},
					tableData      : tableData,
					submissionState: done,
				});
				console.log("reset and retrieve list");
				this.getStitchList();
				this.onReset();
			}
		}).catch(error => {
			console.log("Error: ", error);
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
		});
	}

	deselectRow = () => {
		let mainTable = this.mainTableRef;
		mainTable.current.table.deselectRow();
	}

	getStitchList = () => {
		let method = 'POST';
		let url    = ASSEMBLY_API + MAPPING_STITCH;

		callAxios(method, url, {}).then(response => {
			let tableData = response.data.data;
			this.setState({
					...this.state,
					tableData: tableData,
			});
		}).catch(reason => console.log("Error: ", reason));

	}

	render(){
		let {
			    tableData, formData, editMode, submissionState
		    } = this.state;
		console.log("submissionState 164: ", submissionState);
		return (
			<Container className="dashboard">
				<h3>Table board/Mapping Stitch Sensor And Process</h3>
				<hr/>
				<Row>
					<MappingStitchForm
						formData={formData}
						onReset={this.onReset}
					    editMode={editMode}
						onSubmit={this.handleSubmit}
						submissionState={submissionState}
					/>
				</Row>
				<Row style={{marginTop: 50}}>
					<Col md={12} lg={12}>
						<DataTable id="mainTable"
						           options={{
							           height         : "40em",
							           columnVertAlign: "bottom"
						           }}
						           tableData={tableData}
						           formData={formData}
						           fillForm={this.fillForm}
						           onReset={this.onReset}
						           ref={this.mainTableRef}
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}
export default MappingStitch;
