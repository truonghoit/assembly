import React, {Component} from "react";
import {Table,}           from 'reactstrap';

class LeadTable extends Component {
	constructor(props) {
		super(props);
	}

	fillRow = (index, data, firstCol) => {
		if (firstCol) {
			let rowSpan = 1;
			if (firstCol == "STICHING") {
				rowSpan = 6;
			} else if (firstCol == 'SHOE MAKING') {
				rowSpan = 11;
			} else if (firstCol == 'LEAD TIME') {
				rowSpan = 3;
			}

			let min_process_crr = 0;
			if (data) {
				min_process_crr = data.min_process_crr != undefined && data.min_process_crr != "" ? true : false;
			}
			let color = "#FFFFFF";
			if (min_process_crr) {
				color = "#FF9356";
			}
			return <tr key={index}>
				<td rowSpan={rowSpan} style={{verticalAlign: 'middle', color: color}}>{firstCol}</td>
				<td style={{color: color}}>{data ? data.mas_cd_nm : 0}</td>
				<td style={{color: color}}>{data ? data.pair_qty : 0}</td>
				<td style={{color: color}}>{data ? data.lead_time : 0}</td>
			</tr>;
		} else {
			let min_process_crr = 0;
			if (data) {
				min_process_crr = data.min_process_crr != undefined && data.min_process_crr != "" ? true : false;
			}
			let color = "#FFFFFF";
			if (min_process_crr) {
				color = "#FF9356";
			}
			return <tr key={index}>
				<td style={{color: color}}>{data ? data.mas_cd_nm : 0}</td>
				<td style={{color: color}}>{data ? data.pair_qty : 0}</td>
				<td style={{color: color}}>{data ? data.lead_time : 0}</td>
			</tr>;
		}
	};

	fillTable = (leadData) => {
		let table = null;
		try {
			let parentCategrories = ['STICHING', 'SHOE MAKING', 'LEAD TIME'];
			let rowData           = [];

			let minPairLeadTime     = 0, minPairStiching = 0, minPairShoeMaking = 0;
			let minLeadTimeLeadTime = 0, minLeadTimeStiching = 0, minLeadTimeShoeMaking = 0;
			if (leadData.length > 0) {
				let pairQty1  = leadData[1] ? leadData[1].pair_qty : 0;
				let pairQty2  = leadData[2] ? leadData[1].pair_qty : 0;
				let pairQty3  = leadData[3] ? leadData[1].pair_qty : 0;
				let pairQty4  = leadData[4] ? leadData[1].pair_qty : 0;
				let pairQty5  = leadData[5] ? leadData[1].pair_qty : 0;
				let pairQty6  = leadData[6] ? leadData[1].pair_qty : 0;
				let pairQty7  = leadData[7] ? leadData[1].pair_qty : 0;
				let pairQty8  = leadData[8] ? leadData[1].pair_qty : 0;
				let pairQty9  = leadData[9] ? leadData[1].pair_qty : 0;
				let pairQty10 = leadData[10] ? leadData[1].pair_qty : 0;
				let pairQty11 = leadData[11] ? leadData[1].pair_qty : 0;
				let pairQty12 = leadData[12] ? leadData[1].pair_qty : 0;
				let pairQty13 = leadData[13] ? leadData[1].pair_qty : 0;
				let pairQty14 = leadData[14] ? leadData[1].pair_qty : 0;
				let pairQty15 = leadData[15] ? leadData[1].pair_qty : 0;
				let pairQty16 = leadData[16] ? leadData[1].pair_qty : 0;

				let leadTime1     = leadData[1] ? leadData[1].lead_time : 0;
				let leadTime2     = leadData[2] ? leadData[2].lead_time : 0;
				let leadTime3     = leadData[3] ? leadData[3].lead_time : 0;
				let leadTime4     = leadData[4] ? leadData[4].lead_time : 0;
				let leadTime5     = leadData[5] ? leadData[5].lead_time : 0;
				let leadTime6     = leadData[6] ? leadData[6].lead_time : 0;
				let leadTime7     = leadData[7] ? leadData[7].lead_time : 0;
				let leadTime8     = leadData[8] ? leadData[8].lead_time : 0;
				let leadTime9     = leadData[9] ? leadData[9].lead_time : 0;
				let leadTime10    = leadData[10] ? leadData[10].lead_time : 0;
				let leadTime11    = leadData[11] ? leadData[11].lead_time : 0;
				let leadTime12    = leadData[12] ? leadData[12].lead_time : 0;
				let leadTime13    = leadData[13] ? leadData[13].lead_time : 0;
				let leadTime14    = leadData[14] ? leadData[14].lead_time : 0;
				let leadTime15    = leadData[15] ? leadData[15].lead_time : 0;
				let leadTime16    = leadData[16] ? leadData[16].lead_time : 0;
				minPairLeadTime   = Math.min(pairQty1, pairQty2,
					pairQty3, pairQty4, pairQty5,
					pairQty6, pairQty7, pairQty8,
					pairQty9, pairQty10, pairQty11,
					pairQty12, pairQty13, pairQty14,
					pairQty15, pairQty16);
				minPairStiching   = Math.min(pairQty1, pairQty2,
					pairQty3, pairQty4, pairQty5);
				minPairShoeMaking = Math.min(pairQty6, pairQty7, pairQty8,
					pairQty9, pairQty10, pairQty11,
					pairQty12, pairQty13, pairQty14,
					pairQty15, pairQty16);

				minLeadTimeLeadTime = (leadTime1 + leadTime2 + leadTime3 + leadTime4 + leadTime5 +
				                       leadTime6 + leadTime7 + leadTime8 + leadTime9 + leadTime10 +
				                       leadTime11 + leadTime12 + leadTime13 + leadTime14 + leadTime15 +
				                       leadTime16) / 60;

				minLeadTimeStiching   = (leadTime1 + leadTime2 + leadTime3 + leadTime4 + leadTime5) / 60;
				minLeadTimeShoeMaking = (leadTime6 + leadTime7 + leadTime8 +
				                         leadTime9 + leadTime10 + leadTime11 +
				                         leadTime12 + leadTime13 + leadTime14 +
				                         leadTime15 + leadTime16) / 60;
			}


			rowData[0]  = leadData[0] ? this.fillRow(0, leadData[0], parentCategrories[0]) : null;
			rowData[1]  = leadData[1] ? this.fillRow(1, leadData[1]) : null;
			rowData[2]  = leadData[2] ? this.fillRow(2, leadData[2]) : null;
			rowData[3]  = leadData[3] ? this.fillRow(3, leadData[3]) : null;
			rowData[4]  = leadData[4] ? this.fillRow(4, leadData[4]) : null;
			rowData[5]  = leadData[5] ? this.fillRow(5, leadData[5]) : null;
			rowData[6]  = leadData[6] ? this.fillRow(6, leadData[6], parentCategrories[1]) : null;
			rowData[7]  = leadData[7] ? this.fillRow(7, leadData[7]) : null;
			rowData[8]  = leadData[8] ? this.fillRow(8, leadData[8]) : null;
			rowData[9]  = leadData[9] ? this.fillRow(9, leadData[9]) : null;
			rowData[10] = leadData[10] ? this.fillRow(10, leadData[10]) : null;
			rowData[11] = leadData[11] ? this.fillRow(11, leadData[11]) : null;
			rowData[12] = leadData[12] ? this.fillRow(12, leadData[12]) : null;
			rowData[13] = leadData[13] ? this.fillRow(13, leadData[13]) : null;
			rowData[14] = leadData[14] ? this.fillRow(14, leadData[14]) : null;
			rowData[15] = leadData[15] ? this.fillRow(15, leadData[15]) : null;
			rowData[16] = leadData[16] ? this.fillRow(16, leadData[16]) : null;
			rowData[17] = this.fillRow(17, {
				"mas_cd_nm": "ASC Lead Time",
				"pair_qty" : minPairLeadTime,
				"lead_time": minLeadTimeLeadTime
			}, parentCategrories[2]);
			rowData[18] = this.fillRow(18, {
				"mas_cd_nm": "Stiching",
				"pair_qty" : minPairStiching,
				"lead_time": minLeadTimeStiching
			});
			rowData[19] = this.fillRow(19, {
				"mas_cd_nm": "Shoe Making",
				"pair_qty" : minPairShoeMaking,
				"lead_time": minLeadTimeShoeMaking
			});

			table =
				<tbody>
				{rowData}
				</tbody>;
		} catch (e) {
			console.log("Error: ", e);
			table =
				<tbody>

				</tbody>;
		}


		return table;
	};

	render() {
		let {leadData} = this.props;
		let tableBody  = this.fillTable(leadData);
		return (
			<Table responsive hover style={{backgroundColor: '#232529', color: 'white'}}>
				<thead>
				<tr>
					<th colSpan="2" style={{textAlign: 'center'}}>ASC PROCESS</th>
					<th>PAIRS/HOUR</th>
					<th>LEAD TIME/PAIR</th>
				</tr>
				</thead>
				{tableBody}
			</Table>
		);
	}
}

export default LeadTable;
