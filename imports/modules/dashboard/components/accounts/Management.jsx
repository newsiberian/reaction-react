import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";

/**
 * @class Management
 * @classdesc
 */
class Management extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    return (
      <div></div>
    );
  }
}

Management.propTypes = {};

export default translate("core")(Management);
