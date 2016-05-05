import React, { PropTypes } from "react";
import Checkbox from "material-ui/Checkbox";

/**
 * CheckboxWrapper
 * @summary It is needed because due to incompatibility between material-ui
 * and redux-form.
 * @see https://github.com/erikras/redux-form/issues/542
 * @see https://github.com/erikras/redux-form/issues/334
 */
const CheckboxWrapper = props => {
  const newProps = Object.assign({}, props, {
    value: "",
    checked: Boolean(props.value), // value is a string, but we need boolean
    onCheck: (e, checked) => props.onChange(checked)
  });
  return <Checkbox {...newProps} />;
};

CheckboxWrapper.propTypes = {
  // children: PropTypes.node,
  onChange: PropTypes.func
};

export default CheckboxWrapper;
