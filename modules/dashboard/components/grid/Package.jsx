import { _i18n } from "meteor/universe:i18n";
import { Component, PropTypes } from "react";
import { Link } from "react-router";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import CardHeader from "material-ui/lib/card/card-header";
import FlatButton from "material-ui/lib/flat-button";
import CardText from "material-ui/lib/card/card-text";
import FontIcon from "material-ui/lib/font-icon";
import { hasPermission } from "../../../../client/helpers/permissions";

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
    if (pkg.enabled) {
      if (confirm("Are you sure you want to disable " + pkg.label)) {
        console.log(`${pkg.id} ${pkg.enabled}`);
      }
    }
  }

  renderToggle() {
    let label;
    const { pkg } = this.props;
    if (pkg.enabled) {
      label = _i18n.__("reaction.core.app.disable");
    } else {
      label = _i18n.__("reaction.core.app.enable");
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
          />
        );
      }
    });
  }

  renderManagement() {
    const { pkg } = this.props;
    // TODO check if such route exists
    if (hasPermission(pkg.route) ) {
      // TODO check if we really need to wrap Button in Link
      return (
        <Link to={`/${pkg.route}`}>
          <FlatButton
            label={_i18n.__("reaction.core.gridPackage.details")}
          />
        </Link>
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
  actions: PropTypes.object.isRequired,
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
