import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import { styles } from "../../styles/settings";

/**
 * @class Settings
 * @classdesc
 */
class Settings extends Component {
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

Settings.propTypes = {
  commentsPackageData: PropTypes.shape({
    enabled: PropTypes.bool
  }),
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  t: PropTypes.func.isRequired
};

const options = {
  title: "admin.settings.commentsSettingsLabel"
};

export default translate("core")(ActionBarWrapper(Settings, options));
