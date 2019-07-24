import React, {Component} from "react";
import {Table,}           from 'reactstrap';

class LeadDetailTable extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Table responsive hover style={{backgroundColor: '#232529', color: 'white'}}>
				<thead>
					<tr>
						<th rowSpan="2" style={{verticalAlign:'middle'}}>ASC PROCESS</th>
						<th colSpan="2" style={{textAlign:'center'}}>7:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>7:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>7:30</th>
						<th colSpan="2" style={{textAlign:'center'}}>7:30</th>
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
						<td style={{textAlign:'center', backgroundColor: '#082738'}}>QTY</td>
						<td style={{textAlign:'center', backgroundColor: '#082738'}}>LT</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>abcdef</td>
						<td style={{textAlign:'center'}}>1</td>
						<td style={{textAlign:'center'}}>2</td>
						<td style={{textAlign:'center'}}>3</td>
						<td style={{textAlign:'center'}}>4</td>
						<td style={{textAlign:'center'}}>5</td>
						<td style={{textAlign:'center'}}>6</td>
						<td style={{textAlign:'center'}}>7</td>
						<td style={{textAlign:'center'}}>8</td>
						<td style={{textAlign:'center', backgroundColor: '#082738'}}>9</td>
						<td style={{textAlign:'center', backgroundColor: '#082738'}}>10</td>
					</tr>
					<tr style={{color:'#FF9C64'}}>
						<td>abcdef</td>
						<td style={{textAlign:'center'}}>1</td>
						<td style={{textAlign:'center'}}>2</td>
						<td style={{textAlign:'center'}}>3</td>
						<td style={{textAlign:'center'}}>4</td>
						<td style={{textAlign:'center'}}>5</td>
						<td style={{textAlign:'center'}}>6</td>
						<td style={{textAlign:'center'}}>7</td>
						<td style={{textAlign:'center'}}>8</td>
						<td style={{textAlign:'center', backgroundColor: '#082738'}}>9</td>
						<td style={{textAlign:'center', backgroundColor: '#082738'}}>10</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td>ASC LEAD-TIME</td>
						<td style={{textAlign:'center'}}>1</td>
						<td style={{textAlign:'center'}}>2</td>
						<td style={{textAlign:'center'}}>3</td>
						<td style={{textAlign:'center'}}>4</td>
						<td style={{textAlign:'center'}}>5</td>
						<td style={{textAlign:'center'}}>6</td>
						<td style={{textAlign:'center'}}>7</td>
						<td style={{textAlign:'center'}}>8</td>
						<td style={{textAlign:'center', backgroundColor: '#082738'}}>9</td>
						<td style={{textAlign:'center', backgroundColor: '#082738'}}>10</td>
					</tr>
				</tfoot>
			</Table>
		);
	}
}

export default LeadDetailTable;
