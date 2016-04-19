import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { Tabs, Tab } from "material-ui/Tabs";
import DashboardHeader from "../DashboardHeader.jsx";
// import { ReactionCore } from "meteor/reactioncommerce:core";
import { layoutStyles } from "../../../layout/styles/layout";
import UsersGroup from "./UsersGroup.jsx";

const styles = {
  base: {
    paddingTop: "1rem",
    paddingBottom: "1rem"
  }
};

class Orders extends Component {
  render() {
    const { layoutSettingsActions, ordersActions, t } = this.props;
    return (
      <div style={layoutStyles.parent}>
        <section style={layoutStyles.section}>
          { /* header section */ }
          <DashboardHeader label={t("admin.dashboard.accountsLabel")} />
          <Tabs>
            {orderFilters.map((filter, index) => (
              <Tab
                key={index}
                label={getCount(filter.name) + " " + t(`order.filter.${filter.name}`)}
                onActive={() => ordersActions.changeOrdersFilter(filter.name)}
              >
                { /* main section */ }
                <div className="container-fluid" style={styles.base}>
                  {Boolean(orders && orders.length) ?
                    orders.map(order => (
                      
                    )) :
                    <div></div>
                  }
                </div>
              </Tab>
            ))}
          </Tabs>
        </section>
      </div>
    );
  }
}

Orders.propTypes = {
  getCount: PropTypes.func,
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  location: PropTypes.object.isRequired,
  ordersActions: PropTypes.shape({
    changeOrdersFilter: PropTypes.func
  }).isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(Orders);
