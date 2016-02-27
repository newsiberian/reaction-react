import React, { Component, PropTypes } from "react";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import CardHeader from "material-ui/lib/card/card-header";
import FlatButton from "material-ui/lib/flat-button";
import CardText from "material-ui/lib/card/card-text";
import FontIcon from "material-ui/lib/font-icon";
// import { hasPermission } from "../../../../client/helpers/permissions";
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
    return "shop";
  case "accountsSettings":
    return "accounts";
  case "connectSettings":
    return "connect";
  case "socialSettings":
    return "social";
  case "genericSettings":
    return "generic";
  //case "":
  //  return "";
  default:
    return "";
  }
};

/**
 * @class Package
 * @classdesc
 */
class Package extends Component {
  handleToggleClick(pkg) {
    const { alertActions, t } = this.props;
    let toggle = false;
    let message;
    let errorMessage;
    if (pkg.enabled) {
      if (confirm(t("gridPackage.disableConfirm",
          { app: t(pkg.i18nKeyLabel) }))) {
        toggle = true;
        message = t("gridPackage.pkgDisabled");
        errorMessage = t("gridPackage.errorDisabling");
      }
    } else {
      toggle = true;
      message = t("gridPackage.pkgEnabled");
      errorMessage = t("gridPackage.errorEnabling");
    }
    if (toggle) {
      // TODO implement `shop/togglePackage` when it will be merged
      return ReactionCore.Collections.Packages.update(pkg.packageId, {
        $set: {
          enabled: !pkg.enabled
        }
      }, function (error, result) {
        if (result === 1) {
          alertActions.displayAlert({
            message: pkg.name + message
          });
        } else if (error) {
          alertActions.displayAlert({
            message: errorMessage + error.message
          });
        }
      });
    }
  }

  renderToggle() {
    let label;
    const { pkg, t } = this.props;
    if (pkg.enabled) {
      if (pkg.priority > 1) {
        label = t("gridPackage.disable");
        return (
          <FlatButton
            label={label}
            onClick={() => this.handleToggleClick(pkg)}
          />
        );
      }
    } else {
      label = t("gridPackage.enable");
      return (
        <FlatButton
          label={label}
          onClick={() => this.handleToggleClick(pkg)}
        />
      );
    }
  }

  renderSettings() {
    // we need to fetch settings registry here
    const { pkg, routeActions, t } = this.props;
    return getReactionApps({
      provides: "settings", name: pkg.packageName
    }).map((setting, index) => {
      if (ReactionCore.hasPermission(setting.route)) {
        return (
          <FlatButton
            key={index}
            label={t("app.settings")}
            onClick={() => routeActions.push(
              `/dashboard/settings/${getRoute(setting.template)}`
            )}
          />
        );
      }
    });
  }

  renderManagement() {
    const { pkg, routeActions, t } = this.props;
    if (ReactionCore.hasPermission(pkg.route)) {
      return (
        <FlatButton
          label={t("gridPackage.details")}
          onClick={() => routeActions.push(pkg.route)}
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
  alertActions: PropTypes.shape({
    displayAlert: PropTypes.func
  }).isRequired,
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
  routeActions: PropTypes.object.isRequired,
  settingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(Package);
