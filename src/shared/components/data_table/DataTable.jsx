import React, {Component} from 'react';
import {ReactTabulator}   from "react-tabulator";
import "../../../scss/component/tabulator_bootstrap4.min.css";
import PropTypes          from "prop-types";
var Tabulator = require('tabulator-tables');

export default class DataTable extends Component {
	static propTypes    = {
		columns   : PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.shape({
					title: PropTypes.string.isRequired,
					field: PropTypes.string.isRequired,
				}),
				PropTypes.shape({
					title  : PropTypes.string.isRequired,
					columns: PropTypes.arrayOf(
						PropTypes.shape({
							title: PropTypes.string.isRequired,
							field: PropTypes.string.isRequired,
						})
					).isRequired,
				})
			])
		).isRequired,
		data      : PropTypes.arrayOf(PropTypes.object).isRequired,
		options   : PropTypes.object,
		onRowClick: PropTypes.func,
	};
	static defaultProps = {
		options   : undefined,
		onRowClick: (mouseEvent, rowComponent) => {
			// console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
			console.log(`rowClick id: ${rowComponent.getData().id}`, rowComponent, mouseEvent);
		}
	};

	constructor(props) {
		super(props);
		this.ref = null;
	}

	componentDidMount(){
		let {data, onRowClick, columns, id} = this.props;
		data       = data ? data : [];
		let _this = this;
		this.table = new Tabulator(`#${id}`, {
			height     : "40em",
			movableRows: false,
			selectable:true, //make rows selectable
			columns:columns,
			data:data,
			rowSelectionChanged: (data, rows) => {
				for (let i = 0; i < rows.length - 1; i++){
					let row = rows[i];
					row.deselect();
				}
				if (data.length > 0){
					_this.props.onRowClick(data[data.length - 1]);
				}
			},
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

		let {data, onRowClick} = this.props;
		data       = data ? data : [];

		if (prevProps.data !== this.props.data){
			console.log("componentDidUpdate componentDidUpdate componentDidUpdate");
			console.log("componentDidUpdate componentDidUpdate componentDidUpdate");
			console.log("componentDidUpdate componentDidUpdate componentDidUpdate");
			console.log("tableData: ", data);
			this.table.replaceData(data);
		}
	}

	render() {
		let {columns, data, options, onRowClick, id} = this.props;
		/*return (
			<ReactTabulator
				ref={ref => this.ref = ref}
				columns={columns}
				data={data}
				options={options}
				rowClick={onRowClick}
			/>
		);*/
		return (
			<div id={id}></div>
		);
	}
}
