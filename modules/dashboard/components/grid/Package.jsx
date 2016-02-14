//import { _i18n } from "meteor/universe:i18n";
import { Component, PropTypes } from "react";
import { Link } from "react-router";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import CardHeader from "material-ui/lib/card/card-header";
import FlatButton from "material-ui/lib/flat-button";
import CardText from "material-ui/lib/card/card-text";
import FontIcon from "material-ui/lib/font-icon";
import { hasPermission } from "../../../../client/helpers/permissions";
// import { getLabelsFor } from "../../../../client/helpers/i18n";
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

  }
};

const getType = (pkg) => {
  switch (pkg.cycle) {
  case 1:
    return "Core";
  case 2:
    return "Foundation";
  case 3:
    return "Community";
  case 4:
    return "Local";
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
      if (confirm(t("gridPackage.disable") + pkg.label)) {
        toggle = true;
        //message = _i18n.__("reaction.core.gridPackage.pkgDisabled");
        message = t("gridPackage.pkgDisabled");
        errorMessage = t("gridPackage.errorDisabling");
      }
    } else {
      toggle = true;
      message = t("gridPackage.pkgEnabled");
      //message = _i18n.__("reaction.core.gridPackage.pkgEnabled");
      errorMessage = t("gridPackage.errorEnabling");
    }
    if (toggle) {
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
      label = t("gridPackage.disable");
    } else {
      label = t("gridPackage.enable");
    }
    return (
      <FlatButton
        label={label}
        onClick={() => this.handleToggleClick(pkg)}
      />
    );
  }

  renderSettings() {
    const { pkg, routeActions, t } = this.props;
    return ReactionCore.Apps({
      provides: "settings", name: pkg.name, container: pkg.container
    }).map((setting, index) => {
      if (hasPermission(pkg.route)) {
        return (
          <FlatButton
            key={index}
            label={t("app.settings")}
            //linkButton={true}
            //href={`dashboard/packages/${setting.name}`}
            onClick={() => routeActions.push(`/dashboard/packages/${setting.name}`)}
          />
        );
      }
    });
  }

  renderManagement() {
    const { pkg, routeActions } = this.props;
    if (hasPermission(pkg.route) ) {
      return (
        <FlatButton
          label={_i18n.__("reaction.core.gridPackage.details")}
          onClick={() => routeActions.push(`/${pkg.route}`)}
         />
      );
    }
  }

  render() {
    const { pkg } = this.props;
    return (
      <Card style={styles.base}>
        <CardHeader style={styles.header}
          avatar={<FontIcon className={pkg.icon} style={styles.avatar} />}
          //subtitle={getType(pkg)}
          title={pkg.label}
          titleStyle={styles.title}
        />
        <CardText>{pkg.description}</CardText>
        <CardActions>
          {this.renderToggle()}
          {pkg.enabled && this.renderSettings()}
          {pkg.enabled && this.renderManagement()}
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
    icon: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    packageId: PropTypes.string,
    permissions: PropTypes.array,
    priority: PropTypes.string,
    provides: PropTypes.string,
    route: PropTypes.string
  }).isRequired,
  settingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired
};

export default translate("core")(Package);
