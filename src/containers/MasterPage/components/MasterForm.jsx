import React, {Component} from 'react';
import {change, Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, Col,} from 'reactstrap';
import renderCheckBoxField from '../../../shared/components/form/CheckBox';
import renderSelectField from '../../../shared/components/form/Select';
import validate from './validate';
import {renderField} from "../../../shared/components/form/InputField";
import {ASSEMBLY_API, CATEGORY_ROUTE, FACTORY_ROUTE} from "../../../constants/constants";
import callAxios from "../../../services/api";

class MasterForm extends Component {
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		reset: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen: false,
			categoryCodeOptions: [],
			selectedCategoryCode: null,
			parentCodeOptions: [],
			selectedParentCode: null,
			disableMasCode: false,
		};
	}

	toggle = () => {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	};

	onCategoryCodeSelected = (selectedOption) => {
		this.setState({
			selectedCategoryCode: selectedOption
		});
	};

	onParentCodeSelected = (selectedOption) => {
		this.setState({
			selectedParentCode: selectedOption
		});
	};

	componentDidMount() {
		let method = 'POST';
		let url = ASSEMBLY_API + FACTORY_ROUTE;
		let param = {
			"dropdownlist-name": "factory"
		};

		callAxios(method, url, param).then(response => {
			try {
				this.setState({
					parentCodeOptions: response.data.data.map(parentCode => ({
						value: parentCode.code.toString(),
						label: parentCode.name.toString(),
					})),
					selectedParentCode: {
						value: response.data.data[0].code.toString(),
						label: response.data.data[0].name.toString(),
					}
				})
			} catch (e) {
				console.log("Error: ", e);
			}
		});

		url = ASSEMBLY_API + CATEGORY_ROUTE;
		param = {
			"dropdownlist-name": "cate"
		};

		callAxios(method, url, param).then(response => {
			try {
				this.setState({
					categoryCodeOptions: response.data.data.map(categoryCode => ({
						value: categoryCode.code.toString(),
						label: categoryCode.name.toString(),
					})),
					selectedCategoryCode: {
						value: response.data.data[0].code.toString(),
						label: response.data.data[0].name.toString(),
					}
				})
			} catch (e) {
				console.log("Error: ", e);
			}
		});
	}

	handleParentCodeChange = (event) => {
		if (event.target.value) {
			this.props.dispatch(change('MasterForm', 'mas_cd', ''));
			this.setState({
				disableMasCode: true,
			});
		}
		if (!event.target.value) {
			this.setState({
				disableMasCode: false,
			});
		}
	};

	render() {
		const {handleSubmit, reset} = this.props;
		const {disableMasCode} = this.state;
		return (
			<Col md={12} lg={12}>
				<Card>
					<CardBody>
						<div className="card__title">
							<h5 className="page-title">Edit</h5>
							<h5 className="subhead">Labels are left from fields</h5>
						</div>
						<form className="form form--horizontal" onSubmit={handleSubmit}>
							<div className="form__form-group ">
								<span className="form__form-group-label">Mas Code</span>
								<div className="form__form-group-field">
									<Field
										name="mas_cd"
										component={renderField}
										type="text"
										className="round_coner form__form-group-field-40"
										onChange={this.handleChange}
										disabled={disableMasCode}
									/>
								</div>
							</div>
							<div className="form__form-group">
								<span className="form__form-group-label">General Name</span>
								<div className="form__form-group-field">
									<Field
										name="mas_cd_nm"
										component={renderField}
										type="text"
										className="round_coner form__form-group-field-40"
									/>
								</div>
							</div>
							<div className="form__form-group">
								<span className="form__form-group-label">Category</span>
								<div className="form__form-group-field">
									<div className="form__form-group-field-40">
										<Field
											name="cate_cd_nm"
											component={renderSelectField}
											options={this.state.categoryCodeOptions}
											placeholder={this.state.categoryCodeOptions[0] ? this.state.categoryCodeOptions[0].label : "N/A"}
											onChange={this.onCategoryCodeSelected}

										/>
									</div>
									<div className="form__form-group-field-20">
										<Field
											name="cate_cd"
											component={renderField}
											props={{disabled: true}}
											type="text"
											placeholder={this.state.selectedCategoryCode ? this.state.selectedCategoryCode.value : "N/A"}
											style={{marginLeft: 20}}
										/>
									</div>
									<div style={{width: '20%'}}>
									</div>
									<div className="form__form-group-field-20 justify-content-right"
									     style={{marginTop: 8,}}>
										<Field
											name="virtual_yn"
											component={renderCheckBoxField}
											label="Virtual(Y/N)"
											defaultChecked
										/>
									</div>
								</div>
							</div>
							<div className="form__form-group">
								<span className="form__form-group-label">Parent Code</span>
								<div className="form__form-group-field">
									<div className="form__form-group-field-40">
										<Field
											name="parent_mas_name"
											component={renderSelectField}
											options={this.state.parentCodeOptions}
											placeholder={this.state.parentCodeOptions[0] ? this.state.parentCodeOptions[0].label : "N/A"}
											onChange={this.onParentCodeSelected}
										/>
									</div>
									<div className="form__form-group-field-20">
										<Field
											name="parent_mas_cd"
											component={renderField}
											props={{disabled: true}}
											type="text"
											placeholder={this.state.selectedParentCode ? this.state.selectedParentCode.value : "N/A"}
											style={{marginLeft: 20}}
											onChange={this.handleParentCodeChange}
										/>
									</div>
									<div style={{width: '20%'}}>
									</div>
									<div className="form__form-group-field-20"
									     style={{marginTop: 8,}} className="justify-content-right">
										<Field
											name="active_yn"
											component={renderCheckBoxField}
											label="Active(Y/N)"
											defaultChecked
										/>
									</div>

								</div>
							</div>
							<div className="form__form-group">
								<span className="form__form-group-label">Process Sequence</span>
								<div className="form__form-group-field">
									<Field
										name="processing_seq"
										component="input"
										type="text"
										component={renderField}
										className="round_coner form__form-group-field-40"
									/>
									<div className="form__form-group-field-10"
									     style={{marginLeft: 20, marginTop: 8,}}>
										<Field
											name="temperature"
											component={renderCheckBoxField}
											label="Temperature"
											defaultChecked
										/>
									</div>
									<div className="form__form-group-field-10"
									     style={{marginLeft: 20, marginTop: 8,}}>
										<Field
											name="pressure"
											component={renderCheckBoxField}
											label="Pressure"
											defaultChecked
										/>
									</div>
									<div className="form__form-group-field-10"
									     style={{marginTop: 8,}}>
										<Field
											name="CurringTime"
											component={renderCheckBoxField}
											label="curringTime"
											defaultChecked
										/>
									</div>
									<div style={{width: '8%',}}>
									</div>
									<div style={{width: '20%', marginTop: 8}}
									     className="justify-content-right">
										<Field
											name="sys_code_yn"
											component={renderCheckBoxField}
											label="Sys Code(Y/N)"
											defaultChecked
										/>
									</div>
								</div>
							</div>
							<div className="form__form-group">
								<span className="form__form-group-label">Description</span>
								<div className="form__form-group-field">
									<Field
										name="defaultInput"
										component="input"
										type="text"
									/>
								</div>
							</div>
							<div className="form__form-group-field justify-content-center">
								<Button color="primary" type="submit">Submit</Button>
								<Button type="button" onClick={reset}>
									Cancel
								</Button>
							</div>
						</form>
					</CardBody>
				</Card>
			</Col>
		);
	}
}

export default reduxForm({
	form: 'MasterForm',
	validate,
})(MasterForm);
