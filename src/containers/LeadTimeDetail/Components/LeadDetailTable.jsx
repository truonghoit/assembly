import React, {Component}    from "react";
import {Table,}              from 'reactstrap';
import {DAY_WORKING_SECONDS} from '../../../constants/variableConstants';

class LeadDetailTable extends Component {
	constructor(props) {
		super(props);
	}

	fillRow = (data, i = 0) => {
		if (data) {
			console.log("data 11: ", data);
			let color = '#FFFFFF';
			this.totalQty[i] = data.Qty_0730 + data.Qty_0830 + data.Qty_0930 + data.Qty_1030 + data.Qty_1130 +
			                   data.Qty_1130 + data.Qty_1230 + data.Qty_1330 + data.Qty_1430 + data.Qty_1530 +
			                   data.Qty_1630 + data.Qty_1730 + data.Qty_1830 + data.Qty_1930 + data.Qty_2030 +
			                   data.Qty_2130 + data.Qty_2230;
			this.totalLT[i] = (DAY_WORKING_SECONDS/this.totalQty[i]).toFixed(2);
			return (<tr>
						<td>{data.process_nm}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_0730 && data.flag_Qty_0730!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_0730}</td>
						<td style={{textAlign:'center'}}>{data.LT_0730}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_0830 && data.flag_Qty_0830!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_0830}</td>
						<td style={{textAlign:'center'}}>{data.LT_0830}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_0930 && data.flag_Qty_0930!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_0930}</td>
						<td style={{textAlign:'center'}}>{data.LT_0930}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_1030 && data.flag_Qty_1030!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_1030}</td>
						<td style={{textAlign:'center'}}>{data.LT_1030}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_1130 && data.flag_Qty_1130!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_1130}</td>
						<td style={{textAlign:'center'}}>{data.LT_1130}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_1230 && data.flag_Qty_1230!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_1230}</td>
						<td style={{textAlign:'center'}}>{data.LT_1230}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_1330 && data.flag_Qty_1330!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_1330}</td>
						<td style={{textAlign:'center'}}>{data.LT_1330}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_1430 && data.flag_Qty_1430!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_1430}</td>
						<td style={{textAlign:'center'}}>{data.LT_1430}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_1530 && data.flag_Qty_1530!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_1530}</td>
						<td style={{textAlign:'center'}}>{data.LT_1530}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_1630 && data.flag_Qty_1630!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_1630}</td>
						<td style={{textAlign:'center'}}>{data.LT_1630}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_1730 && data.flag_Qty_1730!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_1730}</td>
						<td style={{textAlign:'center'}}>{data.LT_1730}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_1830 && data.flag_Qty_1830!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_1830}</td>
						<td style={{textAlign:'center'}}>{data.LT_1830}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_1930 && data.flag_Qty_1930!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_1930}</td>
						<td style={{textAlign:'center'}}>{data.LT_1930}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_2030 && data.flag_Qty_2030!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_2030}</td>
						<td style={{textAlign:'center'}}>{data.LT_2030}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_2130 && data.flag_Qty_2130!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_2130}</td>
						<td style={{textAlign:'center'}}>{data.LT_2130}</td>
						<td style={{textAlign:'center', color: data.flag_Qty_2230!=""?'#FF9C64':'#BEBEBE'}}>{data.Qty_2230}</td>
						<td style={{textAlign:'center'}}>{data.LT_2230}</td>
						<td style={{textAlign:'center', backgroundColor: '#082738'}}>{this.totalQty[i]}</td>
						<td style={{textAlign:'center', backgroundColor: '#082738'}}>{this.totalLT[i]}</td>
					</tr>);
		}
	}

	fillTableBody = (leadDetailData) => {
		let tableBody = null;
		try {
			let rowData = [];
			for (let i = 0; i < leadDetailData.length; i++){
				rowData[i] = this.fillRow(leadDetailData[i], i);
			}
			tableBody = <tbody>
							{rowData}
						</tbody>

		} catch (e) {
			console.log("Error: ", e);
			tableBody = <tbody>
						</tbody>
		}
		return tableBody;
	}

	fillTableFooter = (leadDetailData) => {
		let tableFooter = null;
		try {
			let rowFooter = <tr></tr>
			let data = leadDetailData[leadDetailData.length - 1];
			let totalQTyLastRow = [];
			let totalLTLastRow = [];

			totalQTyLastRow[0] = 0; totalQTyLastRow[1] = 0; totalQTyLastRow[2] = 0; totalQTyLastRow[3] = 0;
			totalQTyLastRow[4] = 0; totalQTyLastRow[5] = 0; totalQTyLastRow[6] = 0; totalQTyLastRow[7] = 0;
			totalQTyLastRow[8] = 0; totalQTyLastRow[9] = 0; totalQTyLastRow[10] = 0; totalQTyLastRow[11] = 0;
			totalQTyLastRow[12] = 0; totalQTyLastRow[13] = 0; totalQTyLastRow[14] = 0; totalQTyLastRow[15] = 0;

			totalLTLastRow[0] = 0; totalLTLastRow[1] = 0; totalLTLastRow[2] = 0; totalLTLastRow[3] = 0;
			totalLTLastRow[4] = 0; totalLTLastRow[5] = 0; totalLTLastRow[6] = 0; totalLTLastRow[7] = 0;
			totalLTLastRow[8] = 0; totalLTLastRow[9] = 0; totalLTLastRow[10] = 0; totalLTLastRow[11] = 0;
			totalLTLastRow[12] = 0; totalLTLastRow[13] = 0; totalLTLastRow[14] = 0; totalLTLastRow[15] = 0;

			console.log("leadDetailData: ", leadDetailData);
			for (let i = 0; i < leadDetailData.length; i++){
				totalQTyLastRow[0] = leadDetailData[i].Qty_0730;
				totalQTyLastRow[1] = leadDetailData[i].Qty_0830;
				totalQTyLastRow[2] = leadDetailData[i].Qty_0930;
				totalQTyLastRow[3] = leadDetailData[i].Qty_1030;
				totalQTyLastRow[4] = leadDetailData[i].Qty_1130;
				totalQTyLastRow[5] = leadDetailData[i].Qty_1230;
				totalQTyLastRow[6] = leadDetailData[i].Qty_1330;
				totalQTyLastRow[7] = leadDetailData[i].Qty_1430;
				totalQTyLastRow[8] = leadDetailData[i].Qty_1530;
				totalQTyLastRow[9] = leadDetailData[i].Qty_1630;
				totalQTyLastRow[10] = leadDetailData[i].Qty_1730;
				totalQTyLastRow[11] = leadDetailData[i].Qty_1830;
				totalQTyLastRow[12] = leadDetailData[i].Qty_1930;
				totalQTyLastRow[13] = leadDetailData[i].Qty_2030;
				totalQTyLastRow[14] = leadDetailData[i].Qty_2130;
				totalQTyLastRow[15] = leadDetailData[i].Qty_2230;

				totalLTLastRow[0]   = leadDetailData[i].LT_0730;
				totalLTLastRow[1]   = leadDetailData[i].LT_0830;
				totalLTLastRow[2]   = leadDetailData[i].LT_0930;
				totalLTLastRow[3]   = leadDetailData[i].LT_1030;
				totalLTLastRow[4]   = leadDetailData[i].LT_1130;
				totalLTLastRow[5]   = leadDetailData[i].LT_1230;
				totalLTLastRow[6]   = leadDetailData[i].LT_1330;
				totalLTLastRow[7]   = leadDetailData[i].LT_1430;
				totalLTLastRow[8]   = leadDetailData[i].LT_1530;
				totalLTLastRow[9]   = leadDetailData[i].LT_1630;
				totalLTLastRow[10]   = leadDetailData[i].LT_1730;
				totalLTLastRow[11]   = leadDetailData[i].LT_1830;
				totalLTLastRow[12]   = leadDetailData[i].LT_1930;
				totalLTLastRow[13]   = leadDetailData[i].LT_2030;
				totalLTLastRow[14]   = leadDetailData[i].LT_2130;
				totalLTLastRow[15]   = leadDetailData[i].LT_2230;
			}
			console.log("this.totalQty: ", this.totalQty);
			console.log("this.totalLT: ", this.totalLT);
			totalQTyLastRow[16] = this.totalQty[leadDetailData.length - 1];
			totalLTLastRow[16] = ((this.totalLT.reduce((a, b) => a + parseFloat(b), 0))/60).toFixed(2);//60: change to
			// minutes
			console.log("data.process_nm: ", data.process_nm);
			if (data.process_nm.toUpperCase() === "Packing".toUpperCase()){
				rowFooter = <tr>
					<td>ASC LEAD-TIME</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[0]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[0]}</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[1]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[1]}</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[2]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[2]}</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[3]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[3]}</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[4]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[4]}</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[5]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[5]}</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[6]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[6]}</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[7]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[7]}</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[8]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[8]}</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[9]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[9]}</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[10]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[10]}</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[11]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[11]}</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[12]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[12]}</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[13]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[13]}</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[14]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[14]}</td>
					<td style={{textAlign:'center'}}>{totalQTyLastRow[15]}</td>
					<td style={{textAlign:'center'}}>{totalLTLastRow[15]}</td>
					<td style={{textAlign:'center', backgroundColor: '#082738'}}>{totalQTyLastRow[16]}</td>
					<td style={{textAlign:'center', backgroundColor: '#082738'}}>{totalLTLastRow[16]}</td>
				</tr>
			}
			tableFooter =   <tfoot>
								{rowFooter}
							</tfoot>

		} catch (e) {
			console.log("Error: ", e);
			tableFooter =   <tfoot>
								<tr></tr>
							</tfoot>
		}
		return tableFooter;
	}

	initTotal = (leadDetailData) => {
		this.totalQty = [];
		this.totalLT = [];
		if (leadDetailData.length > 0){
			for (let i = 0; i < leadDetailData.length; i++){
				this.totalQty[i] = 0;
				this.totalLT[i] = 0;
			}
		}
	}

	render() {
		let {leadDetailData} = this.props;
		this.initTotal(leadDetailData);
		let tableBody = this.fillTableBody(leadDetailData);
		let tableFooter = this.fillTableFooter(leadDetailData);
		return (
			<Table responsive style={{backgroundColor: '#232529', color: 'white'}}>
				<thead>
					<tr>
						<th rowSpan="2" style={{verticalAlign:'middle'}}>ASC PROCESS</th>
						<th colSpan="2" style={{textAlign:'center'}}>7:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>8:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>9:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>10:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>11:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>12:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>13:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>14:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>15:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>16:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>17:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>18:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>19:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>20:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>21:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>22:30</th>
						<th colSpan="2" style={{textAlign:'center', backgroundColor: '#082738'}}>TOTAL</th>
					</tr>
					<tr>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center'}}>QTY</td>
						<td style={{textAlign:'center'}}>LT</td>
						<td style={{textAlign:'center', backgroundColor: '#082738'}}>QTY</td>
						<td style={{textAlign:'center', backgroundColor: '#082738'}}>LT</td>
					</tr>
				</thead>
				{tableBody}
				{tableFooter}
			</Table>
		);
	}
}

export default LeadDetailTable;
