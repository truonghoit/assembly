import React, {Component} from "react";
import {Table}            from "reactstrap";
import {FILTER_TYPE}      from "../constants";

class DefectDataTable extends Component {
	constructor(props) {
		super(props);
	}

	fillHeader = (filterType) => {
		let tHead = '';
		let firstColumn = '';
		switch (filterType) {
			case FILTER_TYPE.date:
				firstColumn = 'DATE';
				break;
			case FILTER_TYPE.model:
				firstColumn = 'MODEL';
				break;
			case FILTER_TYPE.article:
				firstColumn = 'ARTICLE';
				break;
		}
		tHead = <thead>
					<tr>
						<td style={{textAlign:'center'}}>{firstColumn}</td>
						<td style={{textAlign:'center'}}>HO KEO (BONDING)</td>
						<td style={{textAlign:'center'}}>LEM KEO (OVER-CEMENT)</td>
						<td style={{textAlign:'center'}}>LEM NUOC XU LY (OVER-PRIMER)</td>
						<td style={{textAlign:'center'}}>DO (DIRTY)</td>
						<td style={{textAlign:'center'}}>NHAN (WRINKLE)</td>
						<td style={{textAlign:'center'}}>LOI KHAC (ETC)</td>
						<td style={{textAlign:'center', backgroundColor: '#082738'}}>TOTAL</td>
					</tr>
				</thead>
		return tHead;
	}

	fillRow = (defectItem) => {
		let backgroundColorArray = [];
		backgroundColorArray[1] = defectItem.defect_type_40101_flag.toString() === "1"?'#222C38':'#232529';
		backgroundColorArray[2] = defectItem.defect_type_40102_flag.toString() === "1"?'#222C38':'#232529';
		backgroundColorArray[3] = defectItem.defect_type_40103_flag.toString() === "1"?'#222C38':'#232529';
		backgroundColorArray[4] = defectItem.defect_type_40104_flag.toString() === "1"?'#222C38':'#232529';
		backgroundColorArray[5] = defectItem.defect_type_40105_flag.toString() === "1"?'#222C38':'#232529';
		backgroundColorArray[6] = defectItem.defect_type_40106_flag.toString() === "1"?'#222C38':'#232529';
		let total = defectItem.defect_type_40101 + defectItem.defect_type_40102 + defectItem.defect_type_40103 + defectItem.defect_type_40104 + defectItem.defect_type_40105 + defectItem.defect_type_40106;
		return <tr>
			<td style={{textAlign:'center', backgroundColor: '#232529'}}>{defectItem.data_type}</td>
			<td style={{textAlign:'center', backgroundColor: backgroundColorArray[1]}}>{defectItem.defect_type_40101?defectItem.defect_type_40101:0}</td>
			<td style={{textAlign:'center', backgroundColor: backgroundColorArray[2]}}>{defectItem.defect_type_40102?defectItem.defect_type_40102:0}</td>
			<td style={{textAlign:'center', backgroundColor: backgroundColorArray[3]}}>{defectItem.defect_type_40103?defectItem.defect_type_40103:0}</td>
			<td style={{textAlign:'center', backgroundColor: backgroundColorArray[4]}}>{defectItem.defect_type_40104?defectItem.defect_type_40104:0}</td>
			<td style={{textAlign:'center', backgroundColor: backgroundColorArray[5]}}>{defectItem.defect_type_40105?defectItem.defect_type_40105:0}</td>
			<td style={{textAlign:'center', backgroundColor: backgroundColorArray[6]}}>{defectItem.defect_type_40106?defectItem.defect_type_40106:0}</td>
			<td style={{textAlign:'center', backgroundColor: '#082738'}}>{total}</td>
		</tr>
	}

	fillBody = (defectData) => {
		let rowArray = [];
		for (let i = 0; i < defectData.length; i++){
			rowArray[i] = this.fillRow(defectData[i]);
		}
		let tBody = <tbody>
						{rowArray}
					</tbody>
		return tBody;
	}

	render(){
		let {filterType, defectData} = this.props;
		let tHead = this.fillHeader(filterType);
		let tBody = this.fillBody(defectData);
		return <Table responsive className="table-striped" style={{backgroundColor: '#232529', color: 'white'}}>
					{tHead}
					{tBody}
				</Table>
	}
}

export default DefectDataTable;
