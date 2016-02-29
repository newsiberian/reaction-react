import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import LeftNav from "material-ui/lib/left-nav";
import Divider from "material-ui/lib/divider";
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
  },
  group: {
    marginBottom: 25
  },
  header: {
    minHeight: "3rem",
    fontSize: "1.5rem",
    fontWidth: "500",
    paddingTop: 15,
    paddingLeft: 10,
    textTransform: "capitalize"
  }
};

const pkgPermissions = pkg => ReactionCore.hasPermission(pkg.name);

const appsInGroup = (groupName, groupedApps) => {
  const group = groupedApps || {};
  return group[groupName] || false;
};

/**
 * @class Packages
 * @classdesc Dashboard packages
 */
class DashboardGrid extends Component {
  constructor(props) {
    super(props);
    this.handleSettingsClose = this.handleSettingsClose.bind(this);
  }

  /**
   * handleSettingsClose
   * @summary setting bar close button click handler.
   */
  handleSettingsClose() {
    this.props.routeActions.push("/dashboard");
  }

  render() {
    const { alertActions, routeActions, settingsActions, children, t,
      corePackageData, shopData, formsActions, apps
    } = this.props;
    const groupedApps = _.groupBy(apps, (app) => app.container || "misc");
    const groups = Object.keys(groupedApps);

    console.log("DashboardGrid rendering...");
    return (
      <div style={layoutStyles.parent}>
        <section style={layoutStyles.section}>
          { /* header section */ }
          <DashboardHeader title={t("app.settings")} />

          { /* main section */ }
          <div className="container-fluid" style={styles.base}>
            {groups.map((group, i) => {
              return (
                <div key={i} style={styles.group}>
                  <div style={styles.header}>{group}</div>
                  <Divider />
                  <div className="row">
                    {appsInGroup(group, groupedApps).map((app, index) => {
                      if (pkgPermissions(app)) {
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
                              pkg={app}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        { /* action bar section */ }
        {children &&
          <LeftNav
            disableSwipeToOpen={true}
            docked={true}
            width={350}
            open={true}
            openRight={true}
            overlayStyle={{height: "100%"}}
            style={layoutStyles.actionBar}
          >
            {React.cloneElement(children, {
              handleSettingsClose: this.handleSettingsClose,
              formsActions: formsActions,
              routeActions: routeActions,
              corePackageData: corePackageData,
              shopData: shopData
            })}
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
  formsActions: PropTypes.shape({
    submitForm: PropTypes.func
  }).isRequired,
  routeActions: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  settingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  corePackageData: PropTypes.object,
  shopData: PropTypes.object,
  apps: PropTypes.array,
  t: PropTypes.func.isRequired
};

export default translate("core")(DashboardGrid);
