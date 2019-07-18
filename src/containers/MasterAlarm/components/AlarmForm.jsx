import React, {Component} from 'react';
import {change, Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, Container, Col, Row, ButtonToolbar} from 'reactstrap';
import validate from './validate';
import {renderField} from "../../../shared/components/form/InputField";
import DataTable from "../../../shared/components/data_table/DataTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircle, faPlay } from '@fortawesome/free-solid-svg-icons'

const columns1 = [
	{ title: "Model", field: "model", width: '50%', align: "center", headerFilter: "input" },
	{ title: "Article", field: "article", width: '50%', align: "center", headerFilter: "input" }
];

const dataArray1 = [
	{
		model: "mmmmmmmmmmmmmmmm",
		article: "aaaaaaaaaaaaaaaaa"
	},
];

class AlarmForm extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		reset: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
	}

	render() {
		let {handleSubmit} = this.props;
		return (
			<Card>
				<CardBody style={{display:"flex"}}>
					<Col md={3} lg={3} style={{minHeight: 300}}>
						<DataTable columns={columns1} data={dataArray1} options={{
							height: "20em",
							border: "none"
						}}/>
					</Col>
					<Col md={2} lg={2} style={{marginLeft: -30, backgroundColor: '#1A2439'}}>
						<div style={{display: "flex", "flex-direction": "column"}}>
							<span className="form__form-group-label text-uppercase" style={{marginTop: 3, paddingLeft: 20, minHeight: 80}}>Process</span>
							<ul className="list-group bg-transparent" style={{width:"100%"}}>
								<li className="list-group-item border-0" style={{backgroundColor: "#1D2F56", color: "#FFFFFF"}}>
									<div className={"d-flex"}>
										<div style={{width: '90%'}}>First item</div>
										<div>
											<FontAwesomeIcon style={{color: 'rgba(255, 255, 255,' +
													' 0.54)', fontSize: 8, justifySelf:"flex-end"}} icon={faPlay} />
										</div>

									</div>

								</li>
								<li className="list-group-item border-0" style={{backgroundColor: "#1A2439", color: "#FFFFFF"}}>Second item</li>
								<li className="list-group-item border-0" style={{backgroundColor: "#1A2439", color: "#FFFFFF"}}>Third item</li>
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
											placeholder="Default Input"
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
											placeholder="Default Input"
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
