import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import Helmet from "react-helmet";
import Divider from "material-ui/Divider";
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
    fontWidth: 500,
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
  render() {
    const {
      routerActions, t, apps, layoutSettingsActions, packagesActions
    } = this.props;
    const groupedApps = _.groupBy(apps, (app) => app.container || "misc");
    const groups = Object.keys(groupedApps);

    console.log("DashboardGrid rendering...");
    return (
      <div style={layoutStyles.parent}>
        {/* Headers */}
        <Helmet
          title={t("app.settings")}
          titleTemplate={`${ReactionCore.getShopName()} • ${t("app.settings")}`}
          meta={[
            {charset: "utf-8"}
          ]}
        />

        <section style={layoutStyles.section}>
          {/* header section */}
          <DashboardHeader label={t("app.settings")} />

          {/* main section */}
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
                            routerActions={routerActions}
                            packagesActions={packagesActions}
                            layoutSettingsActions={layoutSettingsActions}
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
      </div>
    );
  }
}

DashboardGrid.propTypes = {
  packagesActions: PropTypes.shape({
    togglePackage: PropTypes.func
  }).isRequired,
  routerActions: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  apps: PropTypes.array,
  t: PropTypes.func.isRequired
};

export default translate("core")(DashboardGrid);
