import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import ListItem from "material-ui/List/ListItem";
import Toggle from "material-ui/Toggle";
import { styles } from "../../styles/settings";

/**
 * @class Settings
 * @classdesc
 */
class Settings extends Component {
  render() {
    const { commentsPackageData, commentsActions, t } = this.props;
    return (
      <div>
        <ListItem
          primaryText={t("settings.enableModeration")}
          title={t("settings.enableModerationTooltip")}
          rightToggle={
            <Toggle
              onToggle={(e, toggled) =>
                commentsActions.toggleCommentsModeration(toggled)}
              toggled={commentsPackageData.settings.moderation.enabled}
            />
          }
        />
      </div>
    );
  }
}

Settings.propTypes = {
  commentsPackageData: PropTypes.shape({
    enabled: PropTypes.bool
  }),
  commentsActions: PropTypes.shape({
    toggleCommentsModeration: PropTypes.func
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

export default translate(["core", "reaction-comments-core"])(ActionBarWrapper(Settings, options));
