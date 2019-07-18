import React, {Component} from 'react';
import {ReactTabulator} from "react-tabulator";
import "../../../scss/component/tabulator_bootstrap4.min.css"
import PropTypes from "prop-types";

export default class DataTable extends Component {
    static propTypes = {
        columns: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.shape({
                    title: PropTypes.string.isRequired,
                    field: PropTypes.string.isRequired,
                }),
                PropTypes.shape({
                    title: PropTypes.string.isRequired,
                    columns: PropTypes.arrayOf(
                        PropTypes.shape({
                            title: PropTypes.string.isRequired,
                            field: PropTypes.string.isRequired,
                        })
                    ).isRequired,
                })
            ])
        ).isRequired,
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        options: PropTypes.object,
        onRowClick: PropTypes.func,
    };
    static defaultProps = {
        options: undefined,
        onRowClick: (mouseEvent, rowComponent) => {
            // console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
            console.log(`rowClick id: ${rowComponent.getData().id}`, rowComponent, mouseEvent);
        }
    };

    constructor(props) {
        super(props);
        this.ref = null;
    }

    render() {
        let {columns, data, options, onRowClick} = this.props;
        return (
            <ReactTabulator
                ref={ref => this.ref = ref}
                columns={columns}
                data={data}
                options={options}
                rowClick={onRowClick}
            />
        );
    }
}
