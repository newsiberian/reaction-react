import { Component, PropTypes } from "react";
import { ReactionCore } from "meteor/reactioncommerce:core";
// import { Grid, Row, Col } from "react-flexbox-grid";
import "../../styles/flexboxgrid.css";
import Package from "./Package.jsx";

const styles = {
  base: {
    paddingTop: "1rem",
    paddingBottom: "1rem"
  },
  cal: {
    paddingLeft: "0.4rem",
    paddingRight: "0.4rem"
  }
};

const pkgPermissions = pkg => {
  if (ReactionCore.hasPermission("dashboard")) {
    if (pkg.route) {
      return ReactionCore.hasPermission(pkg.route);
    }
    return ReactionCore.hasPermission(pkg.name);
  }
  return false;
};

/**
 * @class Packages
 * @classdesc Dashboard packages
 */
export default class DashboardGrid extends Component {
  render() {
    const { actions, packages } = this.props;
    console.log("DashboardGrid rendering...");
    return (
      <div className="container-fluid" style={styles.base}>
        <div className="row">
          {ReactionCore.Apps({
            provides: "dashboard", shopId: ReactionCore.getShopId()
          }).map((pkg, index) => {
            if (pkgPermissions(pkg)) {

              return (
                <div
                  className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                  key={index}
                  style={styles.cal}
                >
                  <Package actions={actions} pkg={pkg} />
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

DashboardGrid.propTypes = {
  actions: PropTypes.shape({
    getPackages: PropTypes.func,
    togglePackage: PropTypes.func
  }).isRequired,
  packages: PropTypes.array.isRequired
};
