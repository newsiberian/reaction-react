import React, { Component, PropTypes } from "react";
import Checkbox from "material-ui/lib/checkbox";

/**
 * CheckboxWrapper
 * @summary It is needed because due to incompatibility between material-ui
 * and redux-form.
 * @see https://github.com/erikras/redux-form/issues/542
 */
class CheckboxWrapper extends Component {
  handleClick(event/* , index, value */) {
    this.props.onChange(event.target.checked);
  }
  render() {
    return (
      <Checkbox {...this.props} onClick={this.handleClick.bind(this)}>
        {this.props.children}
      </Checkbox>
    );
  }
}

CheckboxWrapper.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired
};

export default CheckboxWrapper;
