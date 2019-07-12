import React, {Component} from 'react';
import DateEditor from "react-tabulator/lib/editors/DateEditor";
import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
import {Button, Card, CardBody, Col,} from 'reactstrap';

import "../../../scss/component/tabulator_midnight_custom.css"; // use Theme(s)

// for React 16.4.x use: import { ReactTabulator }
import { ReactTabulator, reactFormatter } from "react-tabulator"; // for React 15.x

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

function SimpleButton(props: any) {
	const cellData = props.cell._cell.row.data;
	return <button onClick={() => alert(cellData.name)}>Show</button>;
}

const columns = [
	{ title: "Mas Code", field: "mas_cd", width: '10%', align: "center", headerFilter: "input" },
	{ title: "General Name", field: "mas_cd_nm", width: '10%', align: "center", headerFilter: "input" },
	{ title: "Category Code", field: "cate_cd", headerFilter: "input", visible:false },
	{ title: "Category", field: "cate_cd_nm", width: '10%', align: "center", headerFilter: "input" },
	{ title: "Parent Code", field: "parent_mas_cd", headerFilter: "input", visible:false},
	{ title: "Parent", field: "parent_mas_name", width: '10%', align: "center", headerFilter: "input" },
	{ title: "Process Sequence", field: "processing_seq", width: '10%', align: "center", headerFilter: "input" },
	{ title: "Definition", field: "definition_value", align: "center", width: '10%', headerFilter: "input" },
	{ title: "Virtual(Y/N)", field: "virtual_yn", width: '10%', align: "center", formatter: "tickCross"},
	{ title: "Activive(Y/N)", field: "active_yn", width: '10%', align: "center", formatter: "tickCross"},
	{ title: "Sys Code(Y/N)", field: "sys_code_yn", width: '10%', align: "center", formatter: "tickCross"},
	{ title: "Description", field: "remark", width: '9%', align: "center", headerFilter: "input" },
];
const data = [
	{
		mas_cd: "1",
		mas_cd_nm: "mas_cd_nm",
		cate_cd: "12",
		cate_cd_nm: "red",
		parent_mas_cd: "1234",
		parent_mas_name: "5",
		processing_seq: "243",
		definition_value: "111",
		virtual_yn: "true",
		active_yn: "false",
		sys_code_yn: true,
		remark: 'Hello'
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

	setData = () => {
		this.setState({ data });
	};

	clearData = () => {
		this.setState({ data: [] });
	};

	render(){
		let {dataArray} = this.props;
		dataArray = dataArray?dataArray:[];
		const options = {
			height: "40em",
			movableRows: false
		};
		return (
			<div>
				<ReactTabulator
					ref={ref => (this.ref = ref)}
					columns={columns}
					data={dataArray}
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
