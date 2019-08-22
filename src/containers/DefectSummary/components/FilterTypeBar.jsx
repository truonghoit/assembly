import {Component} from "react";
import React       from "react";
import {Col, Row}  from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCalendarDay, faFileExcel, faNewspaper, faClipboard } from '@fortawesome/free-solid-svg-icons'
import {FILTER_TYPE} from '../constants';

class FilterTypeBar extends Component {

	handleTypeClick = (type) => {
		this.props.handleTypeFilterChange(type);
	}

	fillFilterType = (filterType) => {
		let filterTypeArray = [];
		filterTypeArray[0] = <Col key='date' md={1} lg={1}>
								<div style={{color: filterType===FILTER_TYPE.date?'#0CD0EB':'#BEBEBE', paddingLeft:10, paddingRight: 10}} onClick={this.handleTypeClick.bind(this, 'date')}><FontAwesomeIcon icon={faCalendarDay}/><span style={{paddingLeft:5}}>DATE</span></div>
							</Col>
		filterTypeArray[1] = <Col key='model' md={1} lg={1}>
								<div style={{color: filterType===FILTER_TYPE.model?'#0CD0EB':'#BEBEBE', paddingLeft:10, paddingRight: 10}} onClick={this.handleTypeClick.bind(this, 'model')}><FontAwesomeIcon icon={faClipboard}/><span style={{paddingLeft:5}}>MODEL</span></div>
							</Col>
		filterTypeArray[2] = <Col key='article' md={1} lg={1}>
								<div style={{color: filterType===FILTER_TYPE.article?'#0CD0EB':'#BEBEBE', paddingLeft:10, paddingRight: 10}} onClick={this.handleTypeClick.bind(this, 'article')}><FontAwesomeIcon icon={faNewspaper}/><span style={{paddingLeft:5}}>ARTICLE</span></div>
							</Col>
		filterTypeArray[3] = <Col key='excel' md={1} lg={1}>
								<div key='excel' className="filter-div-excel" style={{paddingLeft:10, paddingRight: 10}}><FontAwesomeIcon icon={faFileExcel}/><span style={{paddingLeft:5}}>EXCEL</span></div>
							</Col>
		return filterTypeArray;
	}
	render(){
		let {filterType} = this.props;
		let filterTypeDisplay = this.fillFilterType(filterType);
		return <Row>
					<Col md={4} lg={4}>
					</Col>
					<Col md={4} lg={4}>
						<div style={{color: '#BEBEBE', paddingLeft:10, paddingRight: 10}}>Total Working Hour: 92 Hours</div>
					</Col>
					{filterTypeDisplay}
				</Row>
	}
}
export default FilterTypeBar;
