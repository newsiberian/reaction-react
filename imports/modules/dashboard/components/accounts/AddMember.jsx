import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import { styles } from "../../styles/settings";

/**
 * @class AddMember
 * @classdesc
 */
class AddMember extends Component {
  render() {
    const { t } = this.props;
    return (
      <div></div>
    );
  }
}

AddMember.propTypes = {
  t: PropTypes.func.isRequired
};

const options = {
  title: "admin.settings.addShopMemberSettingsLabel"
};

export default translate("core")(ActionBarWrapper(AddMember, options));
