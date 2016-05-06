import React, { PropTypes } from "react";
import Toggle from "material-ui/Toggle";

/**
 * ToggleWrapper
 * @summary It is needed because due to incompatibility between material-ui
 * and redux-form.
 * @see https://github.com/erikras/redux-form/issues/542
 * @see https://github.com/erikras/redux-form/issues/334
 */
const ToggleWrapper = props => {
  const newProps = Object.assign({}, props, {
    value: "", // this is mock for material-ui value field which should be string
    toggled: Boolean(props.value),
    onToggle: (e, toggled) => props.onChange(toggled)
  });
  return <Toggle {...newProps} />;
};

ToggleWrapper.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]).isRequired
};

export default ToggleWrapper;
