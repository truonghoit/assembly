import React, {Component} from 'react';
import "../../../scss/component/tabulator_midnight_custom.css"; // use Theme(s)

// for React 16.4.x use: import { ReactTabulator }
import {ReactTabulator, reactFormatter} from "react-tabulator";

//			// {"status":200,"data":[{"alarm_date":"2019.07.09","factory_cd":"AS2","line_cd":"2030",
// "process_cd":"20105","sensor_type":"Temp","alarm_seq":1,"alarm_time":"05:15:40","alarm":"G","value":"",
// "article_no":"R6-30500","created_date":1562660433,"standard_from":1234570000,"standard_to":2,
// "model_nm":"PRINCESS WIDE D","article_nm":"R6-30500","process_nm":"Packpart Molding"}]}
const formatAlarm = function(cell, formatterParams, onRendered){ //plain text value
	console.log("cell.getRow(): ", cell.getRow());
	let value = cell._cell.value;
	if (value.toUpperCase() === "R"){
		//cell.getRow().getElement().style.color = '#F84E4E';
		return "<span style='color:#F84E4E; font-size: large;'>●</span>";

	} else if (value.toUpperCase() === "Y"){
		//cell.getRow().getElement().style.color = '#FFD44F';
		return "<span style='color:#FFD44F; font-size: large;'>●</span>";
	} else {
		return "<span font-size: large'>G</span>";
	}
};

const columns = [
	{title: "PROCESS", field: "process_nm", width: '15%', align: "center", headerFilter: "input"},
	{title: "DATE", field: "alarm_date", width: '10%', align: "center", headerFilter: "input"},
	{title: "TIME", field: "alarm_time", width: '10%', align: "center", headerFilter: "input"},
	{title: "SENSOR TYPE", field: "sensor_type", width: '10%', align: "center", headerFilter: "input"},
	{title: "STN", field: "standard_from", width: '15%', align: "center", headerFilter: "input"},
	{title: "VALUE", field: "value", width: '10%', align: "center", headerFilter: "input"},
	{title: "ALARM", field: "alarm", width: '10%', align: "center", headerFilter: "input", formatter: formatAlarm},
	{title: "MODEL", field: "model_nm", align: "center", width: '10%', headerFilter: "input"},
	{title: "ARTICLE", field: "article", width: '10%', align: "center", headerFilter: "input", formatter: "input"},
];

const data = [
	{
	"process_nm": "Backpack Molding",
	"alarm_date": "2019.06.03",
	"alarm_time": "11:53",
	"sensor_type": "Temp 3",
	"standard_from": "10 🡆 30",
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
		"standard_from": "10 🡆 30",
		"value": "20",
		"alarm": "G",
		"model_nm": "Model-2",
		"article": "Article-1",
	},
	{
		"process_nm": "Heat Chamber",
		"alarm_date": "2019.06.15",
		"alarm_time": "10:11",
		"sensor_type": "Pressure 1",
		"standard_from": "10 🡆 30",
		"value": "137",
		"alarm": "Y",
		"model_nm": "Model-3",
		"article": "Article-2",
	}
]

class MachineAlarmTable extends Component {
	state = {
		data: []
	};

	render() {
		/*let {tableData} = this.props;
		tableData = tableData ? tableData : [];*/
		const options = {
			height: "40em",
			movableRows: false,
		};
		return (
			<ReactTabulator
				ref={ref => (this.ref = ref)}
				columns={columns}
				data={data}
				rowClick={this.rowClick}
				options={options}
			/>
		);
	}
}

export default MachineAlarmTable;
