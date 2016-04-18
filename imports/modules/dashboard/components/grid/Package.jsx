import React, { Component, PropTypes } from "react";
import Card from "material-ui/Card/Card";
import CardActions from "material-ui/Card/CardActions";
import CardHeader from "material-ui/Card/CardHeader";
import FlatButton from "material-ui/FlatButton";
import CardText from "material-ui/Card/CardText";
import FontIcon from "material-ui/FontIcon";
import getReactionApps from "../../../../client/helpers/apps";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { translate } from "react-i18next/lib";

const styles = {
  base: {
    marginTop: "0.4rem",
    marginBottom: "0.4rem"
  },
  header: {
    height: "3rem"
  },
  title: {
    fontSize: 24,
    lineHeight: 1.1
  },
  avatar: {
    verticalAlign: "bottom"
  },
  actions: {

  },
  buttons: {

  },
  text: {
    minHeight: 50
  }
};

//const getType = pkg => {
//  switch (pkg.cycle) {
//  case 1:
//    return "Core";
//  case 2:
//    return "Foundation";
//  case 3:
//    return "Community";
//  case 4:
//    return "Local";
//  default:
//    return "";
//  }
//};

/**
 * getRoute
 * @description we need to build route somehow by getting data from reaction
 * registry. The registry `route` is unsuitable for us.
 * @param template
 * @return {*}
 */
const getRoute = template => {
  switch (template) {
  case "shopSettings":
    return "ShopSettingsContainer";
  case "accountsSettings":
    return "AccountsSettingsContainer";
  case "connectSettings":
    return "connect";
  case "socialSettings":
    return "social";
  case "genericSettings":
    return "generic";
  case "i18nSettings":
    return "I18nSettingsContainer";
  case "commentsSettings":
    return "CommentsSettingsContainer";
  default:
    return "";
  }
};

/**
 * @class Package
 * @classdesc
 */
class Package extends Component {
  renderToggle() {
    const { pkg, packagesActions, t } = this.props;
    if (pkg.priority > 1) {
      const label = pkg.enabled ? t("gridPackage.disable") : t("gridPackage.enable");
      return (
        <FlatButton
          label={label}
          onClick={() => packagesActions.togglePackage(pkg)}
        />
      );
    }
  }

  renderSettings() {
    // we need to fetch settings registry here
    const { pkg, layoutSettingsActions, t } = this.props;
    return getReactionApps({
      provides: "settings", name: pkg.packageName
    }).map((setting, index) => {
      if (ReactionCore.hasPermission(setting.route)) {
        return (
          <FlatButton
            key={index}
            label={t("app.settings")}
            title={t(setting.i18nKeyLabel)}
            onClick={() => layoutSettingsActions.openSettings({
              name: getRoute(setting.template),
              payload: {}
            })}
          />
        );
      }
    });
  }

  renderManagement() {
    const { pkg, routerActions, t } = this.props;
    if (ReactionCore.hasPermission(pkg.route)) {
      return (
        <FlatButton
          label={t("gridPackage.details")}
          onClick={() => routerActions.push(pkg.route)}
        />
      );
    }
  }

  render() {
    const { pkg, t } = this.props;
    return (
      <Card style={styles.base}>
        <CardHeader style={styles.header}
          avatar={<FontIcon className={pkg.icon} style={styles.avatar} />}
          title={t(pkg.i18nKeyLabel)}
          titleStyle={styles.title}
        />
        <CardText style={styles.text}>{t(pkg.i18nKeyDescription)}</CardText>
        <CardActions>
          {this.renderToggle()}
          {pkg.enabled && this.renderSettings()}
          {pkg.enabled && pkg.route && this.renderManagement()}
        </CardActions>
      </Card>
    );
  }
}

Package.propTypes = {
  pkg: PropTypes.shape({
    container: PropTypes.string,
    cycle: PropTypes.number,
    description: PropTypes.string,
    enabled: PropTypes.bool,
    i18nKeyDescription: PropTypes.string,
    i18nKeyLabel: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    packageId: PropTypes.string,
    packageName: PropTypes.string,
    permissions: PropTypes.array,
    priority: PropTypes.number,
    provides: PropTypes.string,
    route: PropTypes.string
  }).isRequired,
  packagesActions: PropTypes.shape({
    togglePackage: PropTypes.func
  }).isRequired,
  routerActions: PropTypes.object.isRequired,
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(Package);
