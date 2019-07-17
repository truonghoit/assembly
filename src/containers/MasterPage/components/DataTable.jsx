import React, {Component} from 'react';
import DateEditor from "react-tabulator/lib/editors/DateEditor";
import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
import {Button, Card, CardBody, Col,} from 'reactstrap';

import "../../../scss/component/tabulator_midnight_custom.css"; // use Theme(s)

// for React 16.4.x use: import { ReactTabulator }
import {ReactTabulator, reactFormatter} from "react-tabulator";
import {MASTER_FORM_CONSTANTS} from "./MasterForm";

//custom max min filter function
function minMaxFilterFunction(headerValue, rowValue, rowData, filterParams) {
	//headerValue - the value of the header filter element
	//rowValue - the value of the column in this row
	//rowData - the data for the row being filtered
	//filterParams - params object passed to the headerFilterFuncParams property

	if (rowValue) {
		if (headerValue.start != "") {
			if (headerValue.end != "") {
				return rowValue >= headerValue.start && rowValue <= headerValue.end;
			} else {
				return rowValue >= headerValue.start;
			}
		} else {
			if (headerValue.end != "") {
				return rowValue <= headerValue.end;
			}
		}
	}

	return false; //must return a boolean, true if it passes the filter.
}

let {field} = MASTER_FORM_CONSTANTS;

const columns = [
	{title: "Mas Code", field: field.masCd, width: '10%', align: "center", headerFilter: "input"},
	{title: "General Name", field: field.masCdNm, width: '10%', align: "center", headerFilter: "input"},
	{title: "Category Code", field: field.catCd, headerFilter: "input", visible: false},
	{title: "Category", field: field.catCdNm, width: '10%', align: "center", headerFilter: "input"},
	{title: "Parent Code", field: field.parentMasCd, headerFilter: "input", visible: false},
	{title: "Parent", field: field.parentMasNm, width: '10%', align: "center", headerFilter: "input"},
	{title: "Process Sequence", field: field.processingSeq, width: '10%', align: "center", headerFilter: "input"},
	{title: "Definition", field: field.definitionValue, align: "center", width: '10%', headerFilter: "input"},
	{title: "Virtual(Y/N)", field: field.virtualYn, width: '10%', align: "center", formatter: "tickCross"},
	{title: "Active(Y/N)", field: field.activeYn, width: '10%', align: "center", formatter: "tickCross"},
	{title: "Sys Code(Y/N)", field: field.sysCodeYn, width: '10%', align: "center", formatter: "tickCross"},
	{title: "Description", field: field.description, width: '9%', align: "center", headerFilter: "input"},
];
const data = [
	{
		[field.masCd]: "1",
		[field.masCdNm]: "mas_cd_nm",
		[field.catCd]: "12",
		[field.catCdNm]: "red",
		[field.parentMasCd]: "1234",
		[field.parentMasNm]: "5",
		[field.processingSeq]: "243",
		[field.definitionValue]: "111",
		[field.virtualYn]: "true",
		[field.activeYn]: "false",
		[field.sysCodeYn]: true,
		[field.description]: "Hello",
	},
];

class DataTable extends Component {
	state = {
		data: []
	};
	ref = null;

	rowClick = (e, row) => {
		//console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
		let selectedRow = row._row.data;
		this.props.fillForm(selectedRow);
	};

	render() {
		let {tableData} = this.props;
		tableData = tableData ? tableData : [];
		const options = {
			height: "40em",
			movableRows: false
		};
		return (
			<div>
				<ReactTabulator
					ref={ref => (this.ref = ref)}
					columns={columns}
					data={tableData}
					rowClick={this.rowClick}
					options={options}
					data-custom-attr="test-custom-attribute"
					className="custom-css-class"
				/>


			</div>
		);
	}
}

export default DataTable;
