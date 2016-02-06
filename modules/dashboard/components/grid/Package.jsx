import { Component, PropTypes } from "react";
import Avatar from "material-ui/lib/avatar";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import CardHeader from "material-ui/lib/card/card-header";
import CardTitle from "material-ui/lib/card/card-title";
import FlatButton from "material-ui/lib/flat-button";
import CardText from "material-ui/lib/card/card-text";
import FontIcon from "material-ui/lib/font-icon";
import IconButton from "material-ui/lib/icon-button";

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
    //flex: "1 1 auto"
    //position: "absolute",
    //top: 0,
    //right: 0,
    //height: "100%"
  },
  buttons: {
    //display: "block"
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
  render() {
    const { pkg } = this.props;
    return (
      <Card style={styles.base}>
        <CardHeader style={styles.header}
          avatar={ <FontIcon className={pkg.icon} style={styles.avatar} /> }
          //subtitle={getType(pkg)}
          title={pkg.label}
          titleStyle={styles.title}
        />
        <CardText>{pkg.description}</CardText>
        <CardActions style={styles.actions}>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
          <IconButton
            iconClassName="fa fa-cog fa-fw"
            style={styles.buttons}
          />
          <IconButton
            iconClassName="fa fa-check-square fa-fw"
            style={styles.buttons}
          />
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
