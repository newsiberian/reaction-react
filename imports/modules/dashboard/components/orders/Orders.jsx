import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import Paper from "material-ui/Paper";
import FontIcon from "material-ui/FontIcon";
import RaisedButton from "material-ui/RaisedButton";
import Divider from "material-ui/Divider";
import { Tabs, Tab } from "material-ui/Tabs";
import DashboardHeader from "../DashboardHeader.jsx";
// import { ReactionCore } from "meteor/reactioncommerce:core";
import { layoutStyles } from "../../../layout/styles/layout";
import { moment } from "meteor/momentjs:moment";
import OrderDetailsContainer from "../../containers/OrderDetailsContainer.jsx";
import OrderSummary from "./OrderSummary.jsx";
import OrderItemsContainer from "../../containers/OrderItemsContainer.jsx";

const styles = {
  base: {
    paddingTop: "1rem",
    paddingBottom: "1rem"
  },
  item: {
    marginTop: "1rem",
    marginBottom: "1rem",
    cursor: "pointer"
  },
  row: {
    margin: 0,
    padding: "0.5rem"
  }
};

const orderFilters = [{
  name: "new"
}, {
  name: "processing"
}, {
  name: "completed"
}];

class Orders extends Component {
  render() {
    const {
      getCount, layoutSettingsActions, locale, orders, ordersActions, t
    } = this.props;
    return (
      <div style={layoutStyles.parent}>
        <section style={layoutStyles.section}>
          {/* header section */}
          <DashboardHeader label={t("admin.dashboard.ordersLabel")} />
          <Tabs>
            {orderFilters.map((filter, index) => (
              <Tab
                key={index}
                label={getCount(filter.name) + " " + t(`order.filter.${filter.name}`)}
                onActive={() => ordersActions.changeOrdersFilter(filter.name)}
              >
                {/* main section */}
                <div className="container-fluid" style={styles.base}>
                  {Boolean(orders && orders.length) ?
                    orders.map(order => (
                      <Paper
                        key={order._id}
                        style={styles.item}
                        onTouchTap={() => layoutSettingsActions.openSettings({
                          name: "OrdersWorkflowContainer",
                          payload: { orderId: order._id }
                        })}
                      >

                        {/* Order basic info */}
                        <div className="row" style={styles.row}>
                          <div className="col-xs-12 col-sm-6">
                            <OrderDetailsContainer order={order} />
                          </div>
                          <div className="col-xs-12 col-sm-3">
                            {`${t("order.created")} ${moment(order.createdAt).fromNow()
                              } - ${moment(order.createdAt).format("DD MMM, YYYY HH:mm:ss")}`}
                            {order.shippingTracking &&
                              <p>{t("orderShipping.tracking")}: TODO: add link to shippmentTracking</p>
                            }
                            {filter.name === "new" &&
                              <RaisedButton
                                label={t("orders.start")}
                                primary={true}
                                fullWidth={true}
                                onTouchTap={() => ordersActions.startOrderProcessing(order)}
                              />
                            }
                          </div>
                          <div className="col-xs-12 col-sm-3">
                            <OrderSummary order={order} locale={locale} />
                          </div>
                        </div>

                        <Divider />
                        {/* Order items list */}
                        <div className="row" style={styles.row}>
                          {order.items && order.items.map(item => (
                            <OrderItemsContainer key={item._id} item={item} locale={locale} />
                          ))}
                        </div>
                      </Paper>
                    )) :
                    <div>
                      <h1>
                        <FontIcon className="fa fa-sun" />
                        {t("order.ordersNotFound")}
                      </h1>
                    </div>
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
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  location: PropTypes.object.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object),
  ordersActions: PropTypes.shape({
    changeOrdersFilter: PropTypes.func,
    startOrderProcessing: PropTypes.func
  }).isRequired,
  t: PropTypes.func.isRequired
};

export default translate(["core", "reaction-react"])(Orders);
