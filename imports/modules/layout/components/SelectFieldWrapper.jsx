import React, { Component, PropTypes } from "react";
import SelectField from "material-ui/SelectField";

/**
 * SelectFieldWrapper
 * @summary It is needed because due to incompatibility between material-ui
 * and redux-form.
 * @see https://github.com/erikras/redux-form/issues/542
 */
class SelectFieldWrapper extends Component {
  handleChange(event, index, value) {
    this.props.onChange(value);
  }
  render() {
    return (
      <SelectField {...this.props} onChange={this.handleChange.bind(this)}>
        {this.props.children}
      </SelectField>
    );
  }
}

SelectFieldWrapper.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired
};

export default SelectFieldWrapper;
