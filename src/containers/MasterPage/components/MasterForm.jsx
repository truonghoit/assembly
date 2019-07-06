import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import {
    Card, CardBody, Col, Row, Button, ButtonToolbar,
} from 'reactstrap';
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
            category: [],
            selectedCategory: null,
            factory: [],
            selectedFactory: null,
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };

    onCategoryCodeChange = (selectedOption) => {
        this.setState({
            selectedCategory: selectedOption
        });
    };

    onFactoryCodeChange = (selectedOption) => {
        this.setState({
            selectedFactory: selectedOption
        });
    };

    componentDidMount() {
        let method = 'POST';
        let url = ASSEMBLY_API + FACTORY_ROUTE;
        let param = {
            "dropdownlist-name": "factory"
        };

        callAxios(method, url, param).then(response => {
            if (response.data.data && response.data.data.length > 0) {
                this.setState({
                    factory: response.data.data.map(factory => ({
                        value: factory.code.toString(),
                        label: factory.name.toString(),
                    })),
                    selectedFactory: {
                        value: response.data.data[0].code.toString(),
                        label: response.data.data[0].name.toString(),
                    }
                })
            }
        });

        url = ASSEMBLY_API + CATEGORY_ROUTE;
        param = {
            "dropdownlist-name": "cate"
        };

        callAxios(method, url, param).then(response => {
            if (response.data.data && response.data.data.length > 0) {
                this.setState({
                    category: response.data.data.map(category => ({
                        value: category.code.toString(),
                        label: category.name.toString(),
                    })),
                    selectedCategory: {
                        value: response.data.data[0].code.toString(),
                        label: response.data.data[0].name.toString(),
                    }
                })
            }
        });
    }

    render() {
        const {handleSubmit, reset} = this.props;
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
                                        value="hehehe"
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
                                            options={this.state.category}
                                            placeholder={this.state.category[0] ? this.state.category[0].label : "N/A"}
                                            onChange={this.onCategoryCodeChange}
                                        />
                                    </div>
                                    <div className="form__form-group-field-20">
                                        <Field
                                            name="cate_cd"
                                            component={renderField}
                                            props={{disabled: true}}
                                            type="text"
                                            placeholder={this.state.selectedCategory ? this.state.selectedCategory.value : "N/A"}
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
                                            options={this.state.factory}
                                            placeholder={this.state.factory[0] ? this.state.factory[0].label : "N/A"}
                                            onChange={this.onFactoryCodeChange}
                                        />
                                    </div>
                                    <div className="form__form-group-field-20">
                                        <Field
                                            name="parent_mas_cd"
                                            component={renderField}
                                            props={{disabled: true}}
                                            type="text"
                                            placeholder={this.state.selectedFactory ? this.state.selectedFactory.value : "N/A"}
                                            style={{marginLeft: 20}}
                                        />
                                    </div>
                                    <div style={{width: '20%'}}>
                                    </div>
                                    <div className="form__form-group-field-20" style={{marginTop: 8,}}
                                         className="justify-content-right">
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
                                    <div className="form__form-group-field-10" style={{marginLeft: 20, marginTop: 8,}}>
                                        <Field
                                            name="temperature"
                                            component={renderCheckBoxField}
                                            label="Temperature"
                                            defaultChecked
                                        />
                                    </div>
                                    <div className="form__form-group-field-10" style={{marginLeft: 20, marginTop: 8,}}>
                                        <Field
                                            name="pressure"
                                            component={renderCheckBoxField}
                                            label="Pressure"
                                            defaultChecked
                                        />
                                    </div>
                                    <div className="form__form-group-field-10" style={{marginLeft: 20, marginTop: 8,}}>
                                        <Field
                                            name="CurringTime"
                                            component={renderCheckBoxField}
                                            label="curringTime"
                                            defaultChecked
                                        />
                                    </div>
                                    <div style={{width: '5%',}}>
                                    </div>
                                    <div style={{width: '20%', marginTop: 8}} className="justify-content-right">
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
