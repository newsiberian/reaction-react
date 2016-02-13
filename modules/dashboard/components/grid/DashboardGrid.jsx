import { Component, PropTypes } from "react";
import LeftNav from "material-ui/lib/left-nav";
import { ReactionCore } from "meteor/reactioncommerce:core";
// import { Grid, Row, Col } from "react-flexbox-grid";
import "../../styles/flexboxgrid.css";
import Package from "./Package.jsx";
import DashboardHeader from "../DashboardHeader.jsx";
import { layoutStyles } from "../../../layout/styles/layout";

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
    const { alertActions, routeActions, settingsActions, children } = this.props;
    console.log("DashboardGrid rendering...");
    return (
      <div style={layoutStyles.parent}>
        <section style={layoutStyles.section}>
          { /* header section */ }
          <DashboardHeader title={"Settings"} />
          { /* main section */ }
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
                      <Package
                        alertActions={alertActions}
                        routeActions={routeActions}
                        settingsActions={settingsActions}
                        pkg={pkg}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </section>
        { /* action bar section */ }
        {children &&
          <LeftNav
            disableSwipeToOpen={true}
            docked={true}
            width={300}
            open={true}
            openRight={true}
            overlayStyle={{height: "100%"}}
            style={layoutStyles.actionBar}
            //onRequestChange={open => this.setState({open})}
          >
            {children}
          </LeftNav>}
      </div>
    );
  }
}

DashboardGrid.propTypes = {
  alertActions: PropTypes.shape({
    displayAlert: PropTypes.func
  }).isRequired,
  children: PropTypes.node,
  routeActions: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  settingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired
};
