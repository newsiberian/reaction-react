import { _i18n } from "meteor/universe:i18n";
import { Component, PropTypes } from "react";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import CardHeader from "material-ui/lib/card/card-header";
import FlatButton from "material-ui/lib/flat-button";
import CardText from "material-ui/lib/card/card-text";
import FontIcon from "material-ui/lib/font-icon";
import { hasPermission } from "../../../../client/helpers/permissions";
import { ReactionCore } from "meteor/reactioncommerce:core";

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
export default class Package extends Component {
  handleToggleClick(pkg) {
    const { alertActions } = this.props;
    let toggle = false;
    let message;
    let errorMessage;
    if (pkg.enabled) {
      if (confirm(_i18n.__("reaction.core.gridPackage.disable") + pkg.label)) {
        toggle = true;
        message = _i18n.__("reaction.core.gridPackage.pkgDisabled");
        errorMessage = _i18n.__("reaction.core.gridPackage.errorDisabling");
      }
    } else {
      toggle = true;
      message = _i18n.__("reaction.core.gridPackage.pkgEnabled");
      errorMessage = _i18n.__("reaction.core.gridPackage.errorEnabling");
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
    const { pkg } = this.props;
    if (pkg.enabled) {
      label = _i18n.__("reaction.core.gridPackage.disable");
    } else {
      label = _i18n.__("reaction.core.gridPackage.enable");
    }
    return (
      <FlatButton
        label={label}
        onClick={() => this.handleToggleClick(pkg)}
      />
    );
  }

  renderSettings() {
    const { pkg } = this.props;
    return ReactionCore.Apps({
      provides: "settings", name: pkg.name, container: pkg.container
    }).map((setting, index) => {
      if (hasPermission(pkg.route)) {
        return (
          <FlatButton
            key={index}
            label={_i18n.__("reaction.core.app.settings")}
            linkButton={true}
            href={`${setting.name}?settings=true`}
          />
        );
      }
    });
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
        </CardActions>
      </Card>
    );
  }
}

Package.propTypes = {
  alertActions: PropTypes.shape({
    displayAlert: PropTypes.func
  }).isRequired,
  settingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
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
  }).isRequired
};
