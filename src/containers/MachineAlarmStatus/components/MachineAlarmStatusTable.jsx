import React, {Component} from 'react';
import "../../../scss/component/tabulator_midnight_custom.css"; // use Theme(s)


// for React 16.4.x use: import { ReactTabulator }
import {ReactTabulator, reactFormatter} from "react-tabulator";
import {ARROW_ICON}                     from "../../../constants/variableConstants";
import {Table}                          from "reactstrap";

//			// {"status":200,"data":[{"alarm_date":"2019.07.09","factory_cd":"AS2","line_cd":"2030",
// "process_cd":"20105","sensor_type":"Temp","alarm_seq":1,"alarm_time":"05:15:40","alarm":"G","value":"",
// "article_no":"R6-30500","created_date":1562660433,"standard_from":1234570000,"standard_to":2,
// "model_nm":"PRINCESS WIDE D","article_nm":"R6-30500","process_nm":"Packpart Molding"}]}
const formatAlarmColumn = function(cell, formatterParams, onRendered){ //plain text value
	console.log("cell.getRow(): ", cell.getRow());
	let value = cell._cell.value;
	if (value.toUpperCase() === "R"){
		//cell.getRow().getElement().style.color = '#F84E4E';
		return "<span style='color:#F84E4E; font-size: large;'>●</span>";

	} else if (value.toUpperCase() === "Y"){
		//cell.getRow().getElement().style.color = '#FFD44F';
		return "<span style='color:#FFD44F; font-size: large;'>●</span>";
	} else {
		return "<span style='color:#BEBEBE; font-size: large;'>●</span>";
	}
};

const formatValueColumn = function(cell, formatterParams, onRendered){ //plain text value
	let value = cell._cell.value;
	let rowData = cell.getRow()._row.data;
	if (rowData.alarm.toUpperCase() === "R"){
		return `<span style='color:#F84E4E;'>${value}</span>`;
	} else if (rowData.alarm.toUpperCase() === "Y") {
		return `<span style='color:#FFD44F;'>${value}</span>`;
	} else {
		return "<span></span>";
	}
	return value;
};

const formatDateTimeSensorColumn = function(cell, formatterParams, onRendered){ //plain text value
	let value = cell._cell.value;
	let rowData = cell.getRow()._row.data;
	if (rowData.alarm.toUpperCase() === "R"){
		return `<span style='color:#F84E4E;'>${value}</span>`;
	} else if (rowData.alarm.toUpperCase() === "Y") {
		return `<span style='color:#FFD44F;'>${value}</span>`;
	} else {
		return `<span'>${value}</span>`;
	}
	return value;
};

const columns = [
	{title: "PROCESS", field: "process_nm", width: '15%', align: "center", headerFilter: "input"},
	{title: "DATE", field: "alarm_date", width: '10%', align: "center", headerFilter: "input", formatter: formatDateTimeSensorColumn},
	{title: "TIME", field: "alarm_time", width: '10%', align: "center", headerFilter: "input", formatter: formatDateTimeSensorColumn},
	{title: "SENSOR TYPE", field: "sensor_type", width: '10%', align: "center", headerFilter: "input", formatter: formatDateTimeSensorColumn},
	{title: "STN", field: "standard_from", width: '15%', align: "center", headerFilter: "input"},
	{title: "VALUE", field: "value", width: '10%', align: "center", headerFilter: "input", formatter: formatValueColumn},
	{title: "ALARM", field: "alarm", width: '10%', align: "center", headerFilter: "input", formatter: formatAlarmColumn},
	{title: "MODEL", field: "model_nm", align: "center", width: '10%', headerFilter: "input"},
	{title: "ARTICLE", field: "article", width: '10%', align: "center", headerFilter: "input", formatter: "input"},
];

const alarmHistoryData = [
	{
	"process_nm": "Backpack Molding",
	"alarm_date": "2019.06.03",
	"alarm_time": "11:53",
	"sensor_type": "Temp 3",
	"standard_from": `10 ${ARROW_ICON} 30`,
	"value": "150",
	"alarm": "R",
	"model_nm": "Model-1",
	"article": "Article-1",
	},
	{
		"process_nm": "Toe Molding",
		"alarm_date": "2019.06.05",
		"alarm_time": "13:57",
		"sensor_type": "Temp 1",
		"standard_from": `10 ${ARROW_ICON} 500`,
		"value": "20",
		"alarm": "G",
		"model_nm": "Model-2",
		"article": "Article-1",
	},
	{
		"process_nm": "Heat Chamber",
		"alarm_date": "2019.06.15",
		"alarm_time": "10:15",
		"sensor_type": "Pressure 1",
		"standard_from": `10 ${ARROW_ICON} 60`,
		"value": "137",
		"alarm": "Y",
		"model_nm": "Model-3",
		"article": "Article-2",
	}
]

class MachineAlarmStatusTable extends Component {
	state = {
		data: []
	};

	render() {
		let {machineAlarmData} = this.props;
		machineAlarmData = machineAlarmData ? machineAlarmData : [];
		const options = {
			height: "40em",
			movableRows: false,
		};
		return (
			<Table responsive className="table-striped" style={{backgroundColor: '#232529', color: 'white'}}>
				<thead>
				<tr>
					<td style={{textAlign:'center'}}>PROCESS</td>
					<td style={{textAlign:'center'}}>Sensor No 1</td>
					<td style={{textAlign:'center'}}>Sensor No 2</td>
					<td style={{textAlign:'center'}}>Sensor No 3</td>
					<td style={{textAlign:'center'}}>Sensor No 4</td>
					<td style={{textAlign:'center'}}>Sensor No 5</td>
					<td style={{textAlign:'center'}}>Sensor No 6</td>
					<td style={{textAlign:'center'}}>Sensor No 7</td>
					<td style={{textAlign:'center'}}>Sensor No 8</td>
					<td style={{textAlign:'center', backgroundColor: '#082738'}}>TOTAL</td>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td style={{textAlign:'center', verticalAlign: 'middle'}}>Backpart Molding</td>
					<td style={{textAlign:'center'}}>
						<div className="d-flex flex-column justify-content-center">
							<div className="d-flex justify-content-around">
								<span style={{color:'#BEBEBE', fontSize: 'large'}}>●</span>
								<span style={{color:'#FFD44F', fontSize: 'large'}}>●</span>
								<span style={{color:'#F84E4E', fontSize: 'large'}}>●</span>
							</div>
							<div className="d-flex justify-content-around">
								<span>0</span>
								<span>12</span>
								<span>8</span>
							</div>
						</div>
					</td>
					<td style={{textAlign:'center'}}></td>
					<td style={{textAlign:'center'}}></td>
					<td style={{textAlign:'center'}}></td>
					<td style={{textAlign:'center'}}></td>
					<td style={{textAlign:'center'}}></td>
					<td style={{textAlign:'center'}}></td>
					<td style={{textAlign:'center'}}></td>
					<td style={{textAlign:'center', backgroundColor: '#082738'}}>
						<div className="d-flex flex-column justify-content-center">
							<div className="d-flex justify-content-around">
								<span style={{color:'#BEBEBE', fontSize: 'large'}}>●</span>
								<span style={{color:'#FFD44F', fontSize: 'large'}}>●</span>
								<span style={{color:'#F84E4E', fontSize: 'large'}}>●</span>
							</div>
							<div className="d-flex justify-content-around">
								<span>0</span>
								<span>12</span>
								<span>8</span>
							</div>
						</div>
					</td>
				</tr>
				</tbody>
			</Table>
		);
	}
}

export default MachineAlarmStatusTable;
