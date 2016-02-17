import React, { Component, PropTypes } from "react";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";

/**
 * @class Settings
 * @classdesc
 */
class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>{"TEST"}</div>
    );
  }
}

Settings.propTypes = {};

export default ActionBarWrapper(Settings);
