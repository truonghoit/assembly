import React, {Component} from "react";
import {Table}            from "reactstrap";

class DefectDataTable extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return <Table responsive className="table-striped" style={{backgroundColor: '#232529', color: 'white'}}>
					<thead>
						<tr>
							<td style={{textAlign:'center'}}>TYPE</td>
							<td style={{textAlign:'center'}}>7:30</td>
							<td style={{textAlign:'center'}}>7:30</td>
							<td style={{textAlign:'center'}}>7:30</td>
							<td style={{textAlign:'center'}}>7:30</td>
							<td style={{textAlign:'center'}}>7:30</td>
							<td style={{textAlign:'center'}}>7:30</td>
							<td style={{textAlign:'center'}}>7:30</td>
							<td style={{textAlign:'center'}}>7:30</td>
							<td style={{textAlign:'center', backgroundColor: '#082738'}}>TOTAL</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style={{textAlign:'center'}}>DF1</td>
							<td style={{textAlign:'center', backgroundColor: '#1C3451'}}>123</td>
							<td style={{textAlign:'center'}}>123</td>
							<td style={{textAlign:'center'}}>123</td>
							<td style={{textAlign:'center'}}>123</td>
							<td style={{textAlign:'center'}}>123</td>
							<td style={{textAlign:'center'}}>123</td>
							<td style={{textAlign:'center'}}>123</td>
							<td style={{textAlign:'center'}}>123</td>
							<td style={{textAlign:'center', backgroundColor: '#082738'}}>123</td>
						</tr>
						<tr>
							<td style={{textAlign:'center'}}>DF2</td>
							<td style={{textAlign:'center'}}>123</td>
							<td style={{textAlign:'center'}}>123</td>
							<td style={{textAlign:'center'}}>123</td>
							<td style={{textAlign:'center'}}>123</td>
							<td style={{textAlign:'center'}}>123</td>
							<td style={{textAlign:'center'}}>123</td>
							<td style={{textAlign:'center'}}>123</td>
							<td style={{textAlign:'center'}}>123</td>
							<td style={{textAlign:'center', backgroundColor: '#082738'}}>123</td>
						</tr>
					</tbody>
				</Table>
	}
}

export default DefectDataTable;

