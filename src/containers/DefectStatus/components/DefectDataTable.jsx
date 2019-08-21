import React, {Component} from "react";
import {Table}            from "reactstrap";

class DefectDataTable extends Component {
	constructor(props) {
		super(props);
	}

	fillRow = (dataItem) => {
		let col = [];
		if (Object.keys(dataItem).length > 0){
			let total =     dataItem["Qty_0730"] + dataItem["Qty_0830"] + dataItem["Qty_0930"] +
			                dataItem["Qty_1030"] + dataItem["Qty_1130"] + dataItem["Qty_1230"] +
			                dataItem["Qty_1330"] + dataItem["Qty_1430"] + dataItem["Qty_1530"] +
			                dataItem["Qty_1630"] + dataItem["Qty_1730"] + dataItem["Qty_1830"] +
			                dataItem["Qty_1930"] + dataItem["Qty_2030"];
			col[0] =    <td style={{textAlign:'left'}}>{dataItem["defect_type_nm"]?dataItem["defect_type_nm"]:''}</td>;
			col[1] =    <td style={{textAlign:'center'}}>{dataItem["Qty_0730"]?dataItem["Qty_0730"]:0}</td>;
			col[2] =    <td style={{textAlign:'center'}}>{dataItem["Qty_0830"]?dataItem["Qty_0830"]:0}</td>;
			col[3] =    <td style={{textAlign:'center'}}>{dataItem["Qty_0930"]?dataItem["Qty_0930"]:0}</td>;
			col[4] =    <td style={{textAlign:'center'}}>{dataItem["Qty_1030"]?dataItem["Qty_1030"]:0}</td>;
			col[5] =    <td style={{textAlign:'center'}}>{dataItem["Qty_1130"]?dataItem["Qty_1130"]:0}</td>;
			col[6] =    <td style={{textAlign:'center'}}>{dataItem["Qty_1230"]?dataItem["Qty_1230"]:0}</td>;
			col[7] =    <td style={{textAlign:'center'}}>{dataItem["Qty_1330"]?dataItem["Qty_1330"]:0}</td>;
			col[8] =    <td style={{textAlign:'center'}}>{dataItem["Qty_1430"]?dataItem["Qty_1430"]:0}</td>;
			col[9] =    <td style={{textAlign:'center'}}>{dataItem["Qty_1530"]?dataItem["Qty_1530"]:0}</td>;
			col[10] =   <td style={{textAlign:'center'}}>{dataItem["Qty_1630"]?dataItem["Qty_1630"]:0}</td>;
			col[11] =   <td style={{textAlign:'center'}}>{dataItem["Qty_1730"]?dataItem["Qty_1730"]:0}</td>;
			col[12] =   <td style={{textAlign:'center'}}>{dataItem["Qty_1830"]?dataItem["Qty_1830"]:0}</td>;
			col[13] =   <td style={{textAlign:'center'}}>{dataItem["Qty_1930"]?dataItem["Qty_1930"]:0}</td>;
			col[14] =   <td style={{textAlign:'center'}}>{dataItem["Qty_2030"]?dataItem["Qty_2030"]:0}</td>;
			col[15] =   <td style={{textAlign:'center'}}>{dataItem["Qty_2130"]?dataItem["Qty_2130"]:0}</td>;
			col[16] =   <td style={{textAlign:'center'}}>{dataItem["Qty_2230"]?dataItem["Qty_2230"]:0}</td>;
			col[17] =   <td style={{textAlign:'center', backgroundColor: '#082738'}}>{total?total:0}</td>
		}
		return <tr>{col}</tr>

	}

	fillBody = (data) => {
		let rowArray = [];
		for(let i = 0; i < data.length; i++){
			let dataItem = data[i];
			rowArray[i] = this.fillRow(dataItem);
		}
		return <tbody>{rowArray}</tbody>
	}

	render(){
		let {defectWorkingHourArray} = this.props;
		let body = this.fillBody(defectWorkingHourArray);
		return <Table responsive className="table-striped" style={{backgroundColor: '#232529', color: 'white'}}>
					<thead>
						<tr>
							<td style={{textAlign:'center'}}>TYPE</td>
							<td style={{textAlign:'center'}}>7:30</td>
							<td style={{textAlign:'center'}}>8:30</td>
							<td style={{textAlign:'center'}}>9:30</td>
							<td style={{textAlign:'center'}}>10:30</td>
							<td style={{textAlign:'center'}}>11:30</td>
							<td style={{textAlign:'center'}}>12:30</td>
							<td style={{textAlign:'center'}}>13:30</td>
							<td style={{textAlign:'center'}}>14:30</td>
							<td style={{textAlign:'center'}}>15:30</td>
							<td style={{textAlign:'center'}}>16:30</td>
							<td style={{textAlign:'center'}}>17:30</td>
							<td style={{textAlign:'center'}}>18:30</td>
							<td style={{textAlign:'center'}}>19:30</td>
							<td style={{textAlign:'center'}}>20:30</td>
							<td style={{textAlign:'center'}}>21:30</td>
							<td style={{textAlign:'center'}}>22:30</td>
							<td style={{textAlign:'center', backgroundColor: '#082738'}}>TOTAL</td>
						</tr>
					</thead>
					{body}
				</Table>
	}
}

export default DefectDataTable;

