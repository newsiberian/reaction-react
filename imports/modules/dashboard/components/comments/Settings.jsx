import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import ListItem from 'material-ui/lib/lists/list-item';
import Toggle from 'material-ui/lib/toggle';
import { styles } from "../../styles/settings";

/**
 * @class Settings
 * @classdesc
 */
class Settings extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <ListItem
          primaryText={t("settings.enableModeration")}
          title={t("settings.enableModerationTooltip")}
          rightToggle={<Toggle />}
        />
      </div>
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

export default translate("reaction-comments-core")(ActionBarWrapper(Settings, options));
