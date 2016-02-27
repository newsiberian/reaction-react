import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";

/**
 * @class AccountsManagementContainer
 * @classdesc
 */
class AccountsManagementContainer extends Component {
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

AccountsManagementContainer.propTypes = {};

export default translate("core")(AccountsManagementContainer);
