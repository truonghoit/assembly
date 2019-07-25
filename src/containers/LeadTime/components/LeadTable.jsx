import {Component} from "react";
import React from 'react';
import {
	Card, CardBody, Col, Badge, Table,
} from 'reactstrap';

class LeadTable extends Component {
	constructor(props) {
		super(props);
	}

	fillRow = (data, firstCol) => {
		if (data) {
			if (firstCol){
				let rowSpan = 1;
				if (firstCol == "STICHING"){
					rowSpan = 6;
				} else if (firstCol == 'SHOE MAKING'){
					rowSpan = 11;
				} else if (firstCol == 'LEAD TIME'){
					rowSpan = 3;
				}

				let min_process_crr = data.min_process_crr!=undefined && data.min_process_crr != ""?true:false;
				let color = "#FFFFFF";
				if (min_process_crr){
					color = "#FF9356";
				}
				return  <tr>
							<td rowSpan={rowSpan}style={{verticalAlign: 'middle', color: color}}>{firstCol}</td><td style={{color: color}}>{data.mas_cd_nm}</td><td style={{color: color}}>{data.pair_qty}</td><td style={{color: color}}>{data.lead_time}</td>
						</tr>
			} else {
				let min_process_crr = data.min_process_crr!=undefined && data.min_process_crr != ""?true:false;
				let color = "#FFFFFF";
				if (min_process_crr){
					color = "#FF9356";
				}
				return  <tr>
							<td style={{color: color}}>{data.mas_cd_nm}</td><td style={{color: color}}>{data.pair_qty}</td><td style={{color: color}}>{data.lead_time}</td>
						</tr>
			}
		}
	}

	fillTable = (leadData) => {
		let table = null;
		try {
			let parentCategrories = ['STICHING', 'SHOE MAKING', 'LEAD TIME'];
			let rowData = [];

			let minPairLeadTime = 0, minPairStiching = 0, minPairShoeMaking = 0;
			let minLeadTimeLeadTime = 0, minLeadTimeStiching = 0, minLeadTimeShoeMaking = 0;
			if (leadData.length > 0){
				minPairLeadTime = Math.min( leadData[1].pair_qty, leadData[2].pair_qty,
					leadData[3].pair_qty, leadData[4].pair_qty, leadData[5].pair_qty,
					leadData[6].pair_qty, leadData[7].pair_qty, leadData[7].pair_qty,
					leadData[9].pair_qty, leadData[10].pair_qty, leadData[11].pair_qty,
					leadData[12].pair_qty, leadData[13].pair_qty, leadData[14].pair_qty,
					leadData[15].pair_qty, leadData[16].pair_qty);
				minPairStiching = Math.min( leadData[1].pair_qty, leadData[2].pair_qty,
					leadData[3].pair_qty, leadData[4].pair_qty, leadData[5].pair_qty);
				minPairShoeMaking = Math.min(leadData[6].pair_qty, leadData[7].pair_qty, leadData[7].pair_qty,
					leadData[9].pair_qty, leadData[10].pair_qty, leadData[11].pair_qty,
					leadData[12].pair_qty, leadData[13].pair_qty, leadData[14].pair_qty,
					leadData[15].pair_qty, leadData[16].pair_qty);

				minLeadTimeLeadTime =   (
					                        leadData[1].lead_time + leadData[2].lead_time + leadData[3].lead_time + leadData[4].lead_time + leadData[5].lead_time +
					                        leadData[6].lead_time + leadData[7].lead_time + leadData[7].lead_time + leadData[9].lead_time + leadData[10].lead_time +
					                        leadData[11].lead_time + leadData[12].lead_time + leadData[13].lead_time + leadData[14].lead_time + leadData[15].lead_time + leadData[16].lead_time)/60;

				minLeadTimeStiching =  (leadData[1].lead_time + leadData[2].lead_time + leadData[3].lead_time + leadData[4].lead_time + leadData[5].lead_time)/60;
				minLeadTimeShoeMaking   =  (leadData[6].lead_time + leadData[7].lead_time + leadData[7].lead_time +
				                            leadData[9].lead_time + leadData[10].lead_time + leadData[11].lead_time +
				                            leadData[12].lead_time + leadData[13].lead_time + leadData[14].lead_time +
				                            leadData[15].lead_time + leadData[16].lead_time)/60;
			}


			rowData[0] = this.fillRow(leadData[0], parentCategrories[0]);
			rowData[1] = this.fillRow(leadData[1]);
			rowData[2] = this.fillRow(leadData[2]);
			rowData[3] = this.fillRow(leadData[3]);
			rowData[4] = this.fillRow(leadData[4]);
			rowData[5] = this.fillRow(leadData[5]);
			rowData[6] = this.fillRow(leadData[6], parentCategrories[1]);
			rowData[7] = this.fillRow(leadData[7]);
			rowData[8] = this.fillRow(leadData[8]);
			rowData[9] = this.fillRow(leadData[9]);
			rowData[10] = this.fillRow(leadData[10]);
			rowData[11] = this.fillRow(leadData[11]);
			rowData[12] = this.fillRow(leadData[12]);
			rowData[13] = this.fillRow(leadData[13]);
			rowData[14] = this.fillRow(leadData[14]);
			rowData[15] = this.fillRow(leadData[15]);
			rowData[16] = this.fillRow(leadData[16]);
			rowData[17] = this.fillRow({
				"mas_cd_nm" : "ASC Lead Time",
				"pair_qty" : minPairLeadTime,
				"lead_time" :   minLeadTimeLeadTime
			}, parentCategrories[2]);
			rowData[18] = this.fillRow({
				"mas_cd_nm" : "Stiching",
				"pair_qty" : minPairStiching,
				"lead_time" :   minLeadTimeStiching
			});
			rowData[19] = this.fillRow({
				"mas_cd_nm" : "Shoe Making",
				"pair_qty" : minPairShoeMaking,
				"lead_time" :   minLeadTimeShoeMaking
			});

			table =
				    <tbody>
				    {rowData}
				    </tbody>
		} catch (e){
			console.log("Error: ", e);
			table =
				    <tbody>

				    </tbody>
		}


		return table;
	}

	render() {
		let {leadData} = this.props;
		let tableBody = this.fillTable(leadData);
		return (
			<Table responsive hover style={{backgroundColor:'#232529', color: 'white'}}>
				<thead>
				<tr>
					<th colSpan="2" style={{textAlign: 'center'}}>ASC PROCESS</th><th>PAIRS/HOUR</th><th>LEAD TIME/PAIR</th>
				</tr>
				</thead>
				{tableBody}
			</Table>
		);
	}
}

export default LeadTable;
