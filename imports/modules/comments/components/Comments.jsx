import React, {Component, PropTypes} from "react";
import {translate} from "react-i18next/lib";

/**
 * @class Comments
 * @classdesc
 */
class Comments extends Component {
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

$Component.propTypes = {
  t: PropTypes.func.isRequired
};

export default translate("core")(Comments);
