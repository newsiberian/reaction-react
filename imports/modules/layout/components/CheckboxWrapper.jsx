import React, { Component, PropTypes } from "react";
import Checkbox from "material-ui/lib/checkbox";

/**
 * CheckboxWrapper
 * @summary It is needed because due to incompatibility between material-ui
 * and redux-form.
 * @see https://github.com/erikras/redux-form/issues/542
 */
class CheckboxWrapper extends Component {
  handleClick(checked) {
    this.props.onChange(checked);
  }
  render() {
    return (
      <Checkbox
        {...this.props}
        value={this.props.name}
        checked={this.props.value}
        onCheck={(e, checked) => this.handleClick(checked)}
      >
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
