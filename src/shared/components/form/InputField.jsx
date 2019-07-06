import PropTypes from "prop-types";
import React from "react";

export const renderField = ({input, placeholder, type, meta: {touched, error}, disabled}) => {
    return (
        <div className="form__form-group-input-wrap round_coner form__form-group-field-40">
            <input
                {...input}
                placeholder={placeholder}
                type={type}
                disabled={disabled ? disabled : false}
            />
            {
                touched && error && <span className="form__form-group-error">{error}</span>
            }
        </div>
    );
};

renderField.propTypes = {
    input: PropTypes.shape().isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
    }),
};

renderField.defaultProps = {
    placeholder: '',
    meta: null,
    type: 'text',
};
