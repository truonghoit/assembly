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

	fillRow = rowData => {
		let columns = [];
		let totalGrey   =   parseInt(rowData.sensor_no_1_gray) + parseInt(rowData.sensor_no_2_gray) + parseInt(rowData.sensor_no_3_gray) +
		                    parseInt(rowData.sensor_no_4_gray) + parseInt(rowData.sensor_no_5_gray) + parseInt(rowData.sensor_no_6_gray) +
		                    parseInt(rowData.sensor_no_8_gray) + parseInt(rowData.sensor_no_8_gray);
		let totalYellow =   parseInt(rowData.sensor_no_1_yellow) + parseInt(rowData.sensor_no_2_yellow) + parseInt(rowData.sensor_no_3_yellow) +
		                    parseInt(rowData.sensor_no_4_yellow) + parseInt(rowData.sensor_no_5_yellow) + parseInt(rowData.sensor_no_6_yellow) +
		                    parseInt(rowData.sensor_no_8_yellow) + parseInt(rowData.sensor_no_8_yellow);
		let totalRed    =   parseInt(rowData.sensor_no_1_red) + parseInt(rowData.sensor_no_2_red) + parseInt(rowData.sensor_no_3_red) +
		                    parseInt(rowData.sensor_no_4_red) + parseInt(rowData.sensor_no_5_red) + parseInt(rowData.sensor_no_6_red) +
		                    parseInt(rowData.sensor_no_8_red) + parseInt(rowData.sensor_no_8_red);
		columns[0] = <td style={{textAlign:'center', verticalAlign: 'middle'}}>{rowData.process_nm}</td>

		columns[1] = <td style={{textAlign:'center'}}></td>
		columns[2] = <td style={{textAlign:'center'}}></td>
		columns[3] = <td style={{textAlign:'center'}}></td>
		columns[4] = <td style={{textAlign:'center'}}></td>
		columns[5] = <td style={{textAlign:'center'}}></td>
		columns[6] = <td style={{textAlign:'center'}}></td>
		columns[7] = <td style={{textAlign:'center'}}></td>
		columns[8] = <td style={{textAlign:'center'}}></td>
		columns[9] = <td style={{textAlign:'center', backgroundColor: '#082738'}}>
						<div className="d-flex flex-column justify-content-center">
							<div className="d-flex justify-content-around">
								<span style={{color:'#BEBEBE', fontSize: 'large'}}>●</span>
								<span style={{color:'#FFD44F', fontSize: 'large'}}>●</span>
								<span style={{color:'#F84E4E', fontSize: 'large'}}>●</span>
							</div>
							<div className="d-flex justify-content-around">
								<span>{totalGrey}</span>
								<span>{totalYellow}</span>
								<span>{totalRed}</span>
							</div>
						</div>
					</td>
		for (let i = 1; i < 9; i++) {
			let grayValue = `sensor_no_${i}_gray`;
			let yellowValue = `sensor_no_${i}_yellow`;
			let redValue = `sensor_no_${i}_red`;
			if (rowData[grayValue] > 0 || rowData[yellowValue] > 0 || rowData[redValue]){
				columns[i] = <td style={{textAlign:'center'}}>
								<div className="d-flex flex-column justify-content-center">
									<div className="d-flex justify-content-around">
										<span style={{color:'#BEBEBE', fontSize: 'large'}}>●</span>
										<span style={{color:'#FFD44F', fontSize: 'large'}}>●</span>
										<span style={{color:'#F84E4E', fontSize: 'large'}}>●</span>
									</div>
									<div className="d-flex justify-content-around">
										<span>{rowData[grayValue]}</span>
										<span>{rowData[yellowValue]}</span>
										<span>{rowData[redValue]}</span>
									</div>
								</div>
							</td>
			}
		}
		return columns;
	}

	fillTableBody = data => {
		console.log("fillTableData");
		console.log("data 110: ", data);
		let tableRow = [];
		for (let i = 0; i < data.length; i++){
			tableRow[i] = this.fillRow(data[i]);
		}
		return  <tbody>
					{tableRow}
				</tbody>
	}

	render() {
		let {data} = this.props;
		data = data ? data : [];
		let tableBody = this.fillTableBody(data);
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
				{tableBody}
			</Table>
		);
	}
}

export default MachineAlarmStatusTable;
