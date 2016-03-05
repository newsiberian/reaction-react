import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import LeftNav from "material-ui/lib/left-nav";
import Divider from "material-ui/lib/divider";
import { ReactionCore } from "meteor/reactioncommerce:core";
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
      corePackageData, shopData, formsActions, apps, i18nActions, activeCard
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
              // we need to show header only for groups which have apps inside,
              // so we need to filter them before render header
              const allApps = appsInGroup(group, groupedApps);
              const allowedApps = allApps.filter(app => pkgPermissions(app));
              if (allowedApps.length) {
                return (
                  <div key={i} style={styles.group}>
                    <div style={styles.header}>{t(`admin.groups.${group}`)}</div>
                    <Divider />
                    <div className="row">
                      {allowedApps.map((app, index) => (
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
                      ))}
                    </div>
                  </div>
                );
              }
            })}
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
            // overlayStyle={{height: "100vh"}}
            containerStyle={layoutStyles.actionBar}
            style={layoutStyles.actionBarWrapper}
          >
            {React.cloneElement(children, {
              activeCard: activeCard,
              handleSettingsClose: this.handleSettingsClose,
              formsActions: formsActions,
              i18nActions: i18nActions,
              routeActions: routeActions,
              corePackageData: corePackageData,
              shopData: shopData,
              toggleCard: settingsActions.toggleCard
            })}
          </LeftNav>}
      </div>
    );
  }
}

DashboardGrid.propTypes = {
  activeCard: PropTypes.string,
  alertActions: PropTypes.shape({
    displayAlert: PropTypes.func
  }).isRequired,
  children: PropTypes.node,
  formsActions: PropTypes.shape({
    submitForm: PropTypes.func
  }).isRequired,
  i18nActions: PropTypes.shape({
    toggleLanguage: PropTypes.func
  }).isRequired,
  routeActions: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  settingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func,
    toggleCard: PropTypes.func
  }).isRequired,
  corePackageData: PropTypes.object,
  shopData: PropTypes.object,
  apps: PropTypes.array,
  t: PropTypes.func.isRequired
};

export default translate("core")(DashboardGrid);
