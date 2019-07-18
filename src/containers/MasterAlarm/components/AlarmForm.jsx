import React, {Component} from 'react';
import {change, Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, Container, Col, Row, ButtonToolbar} from 'reactstrap';
import validate from './validate';
import {renderField} from "../../../shared/components/form/InputField";
import DataTable from "../../../shared/components/data_table/DataTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircle, faPlay } from '@fortawesome/free-solid-svg-icons'
import {ASSEMBLY_API,
	ALARM_LIST_PROCESS} from "../../../constants/constants";
import callAxios from "../../../services/api";

class AlarmForm extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		reset: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = ({
			dataProcess: [],
		});
	}

	rowClick = (e, row) => {
		if (this.props.onMounted){
			console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
		}

		let selectedRow = row._row.data;
		let params = {
			model_cd: selectedRow.model_cd,
			article_no: selectedRow.article_no
		};
		this.loadListProcess(params);
	};

	loadListProcess = (params) => {
		let method = 'POST';
		let url = ASSEMBLY_API + ALARM_LIST_PROCESS;

		callAxios(method, url, params).then(response => {
			try {
				let responseArray = response.data.data;
				let dataArray = [];
				responseArray.map(item => {
					item = {
						code: item.code.toString(),
						name: item.name.toString(),
					};
					dataArray.push(item);
				});
				this.setState({
					dataProcess: dataArray,
				});
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	onClickProcess = (row) => {
		let processCode = row.target.value;
		this.setState({
			selectedProcessCode: processCode,
		});
	}

	render() {
		let {handleSubmit, columnsModelArticle, dataModelArticle} = this.props;
		let {dataProcess, selectedProcessCode} = this.state;

		return (
			<Card>
				<CardBody style={{display:"flex"}}>
					<Col md={3} lg={3} style={{minHeight: 300}}>
						<DataTable columns={columnsModelArticle} data={dataModelArticle} options={{
							height: "20em",
							border: "none",
						}} onRowClick={this.rowClick}/>
					</Col>
					<Col md={2} lg={2} style={{marginLeft: -30, backgroundColor: '#1A2439'}}>
						<div style={{display: "flex", flexDirection: "column"}}>
							<span className="form__form-group-label text-uppercase" style={{paddingTop: 30, paddingLeft: 20, minHeight: 80}}>Process</span>
							<ul className="list-group bg-transparent" style={{width:"100%"}} onClick={this.onClickProcess}>
								{
									dataProcess.map(item => {
											let itemClass = (item.code == selectedProcessCode)?'list-group-item border-0 selected-process-code':'list-group-item border-0 not-selected-process-code';
											let innerData = (item.code == selectedProcessCode)?<div className={"d-flex"}>
												<div style={{width: '90%'}}>{item.name}</div>
												<div>
													<FontAwesomeIcon style={{color: 'rgba(255, 255, 255,' +
															' 0.54)', fontSize: 8, justifySelf:"flex-end"}} icon={faPlay} />
												</div>

											</div>:item.name;
											return <li className={itemClass} key={item.code}
											    value={item.code}>{innerData}</li>
										})
								}
							</ul>
						</div>
					</Col>
					<Col md={7} lg={7} style={{backgroundColor: '#1E2229'}}>
						<form className="form form--horizontal" onSubmit={handleSubmit}>
							<Col md={6} lg={6}>
								<div className="form__form-group">
									<span className="form__form-group-label">Model</span>
									<div className="form__form-group-field">
										<Field
											name="defaultInput"
											component="input"
											type="text"
											disabled={true}
											className={"marginLeff-20"}
										/>
									</div>
								</div>
							</Col>
							<Col md={6} lg={6}>
								<div className="form__form-group">
									<span className="form__form-group-label">Article</span>
									<div className="form__form-group-field">
										<Field
											name="defaultInput"
											component="input"
											type="text"
											disabled={true}
										/>
									</div>
								</div>
							</Col>

							<Col md={3} lg={3}>
							</Col>
							<Col md={3} lg={3}>
								<span className="form__form-group-label text-center text-uppercase" >Temperature</span>
							</Col>
							<Col md={3} lg={3}>
								<span className="form__form-group-label text-center text-uppercase">Pressure</span>
							</Col>
							<Col md={3} lg={3}>
								<span className="form__form-group-label text-center text-uppercase">Curing Time</span>
							</Col>

							<hr style={{height: 30}}/>
							<Col md={3} lg={3}>
								<span className="form__form-group-label"><FontAwesomeIcon style={{color: '#03CF65', fontSize: 8}} icon={faCircle} /> Standard Value</span>
							</Col>
							<Col md={3} lg={3}>
								<Row>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">From</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="temp_standard_from"
											component={renderField}
											type="text"
										/>
									</Col>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">To</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="temp_standard_to"
											component={renderField}
											type="text"
										/>
									</Col>
								</Row>
							</Col>
							<Col md={3} lg={3}>
								<Row>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">From</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="pres_standard_from"
											component={renderField}
											type="text"
										/>
									</Col>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">To</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="pres_standard_to"
											component={renderField}
											type="text"
										/>
									</Col>
								</Row>
							</Col>
							<Col md={3} lg={3}>
								<Row>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">From</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="curr_standard_from"
											component={renderField}
											type="text"
										/>
									</Col>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">To</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="curr_standard_to"
											component={renderField}
											type="text"
										/>
									</Col>
								</Row>
							</Col>

							<hr style={{height: 30}}/>
							<Col md={3} lg={3}>
								<span className="form__form-group-label"><FontAwesomeIcon style={{color: '#FFD44F', fontSize: 8}} icon={faCircle} /> Yellow Range</span>
							</Col>
							<Col md={3} lg={3}>
								<Row>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">From</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="temp_yellow_first"
											component={renderField}
											type="text"
										/>
									</Col>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">To</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="temp_yellow_last"
											component={renderField}
											type="text"
										/>
									</Col>
								</Row>
							</Col>
							<Col md={3} lg={3}>
								<Row>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">From</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="pres_yellow_first"
											component={renderField}
											type="text"
										/>
									</Col>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">To</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="pres_yellow_last"
											component={renderField}
											type="text"
										/>
									</Col>
								</Row>
							</Col>
							<Col md={3} lg={3}>
								<Row>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">From</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="curr_yellow_first"
											component={renderField}
											type="text"
										/>
									</Col>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">To</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="curr_yellow_last"
											component={renderField}
											type="text"
										/>
									</Col>
								</Row>
							</Col>

							<hr style={{height: 30}}/>
							<Col md={3} lg={3}>
								<span className="form__form-group-label"><FontAwesomeIcon style={{color: '#F84E4E', fontSize: 8}} icon={faCircle} /> Red Range</span>
							</Col>
							<Col md={3} lg={3}>
								<Row>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">From</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="temp_red_from"
											component={renderField}
											type="text"
										/>
									</Col>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">To</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="temp_red_to"
											component={renderField}
											type="text"
										/>
									</Col>
								</Row>
							</Col>
							<Col md={3} lg={3}>
								<Row>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">From</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="pres_red_first"
											component={renderField}
											type="text"
										/>
									</Col>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">To</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="pres_red_last"
											component={renderField}
											type="text"
										/>
									</Col>
								</Row>
							</Col>
							<Col md={3} lg={3}>
								<Row>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">From</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="curr_red_first"
											component={renderField}
											type="text"
										/>
									</Col>
									<Col md={2} lg={2}>
										<span className="form__form-group-label">To</span>
									</Col>
									<Col md={4} lg={4}>
										<Field
											name="curr_red_last"
											component={renderField}
											type="text"
										/>
									</Col>
								</Row>
							</Col>

							<hr style={{height: 30}}/>
							<Col md={4} lg={4}>
							</Col>
							<Col md={8} lg={8} style={{marginLeft: -80}}>
								<Field
									name="defaultInput"
									component="input"
									type="text"
									placeholder="Remark"
								/>
							</Col>

							<hr style={{height: 30}}/>
							<Col md={12} lg={12} style={{display:'flex', justifyItems: 'flex-end'}}>
								<ButtonToolbar className="form__button-toolbar">
									<Button color="primary" type="submit">Submit</Button>
									<Button type="button">
										Cancel
									</Button>
								</ButtonToolbar>
							</Col>
						</form>
					</Col>
				</CardBody>
			</Card>
		);
	}
}

export default reduxForm({
	form: 'AlarmForm',
	validate,
})(AlarmForm);
