import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { ReactionCore } from "meteor/reactioncommerce:core";
import Helmet from "react-helmet";
import { formatPrice } from "../../../../client/helpers/i18n";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import Paper from "material-ui/Paper";
import ActionDone from "material-ui/svg-icons/action/done";
import ActionDeleteForever from "material-ui/svg-icons/action/delete-forever";
import ActionSettings from "material-ui/svg-icons/action/settings";
import ContentClear from "material-ui/svg-icons/content/clear";
import DashboardHeader from "../DashboardHeader.jsx";
import { layoutStyles } from "../../../layout/styles/layout";

const styles = {
  base: {
    paddingTop: "1rem",
    paddingBottom: "1rem"
  }
};

class Management extends Component {
  render() {
    const {
      shippingActions, shippingProviders, layoutSettingsActions, locale, t
    } = this.props;

    return (
      <div style={layoutStyles.parent}>
        {/* Headers */}
        <Helmet
          title={t("admin.dashboard.shippingLabel")}
          titleTemplate={`${ReactionCore.getShopName()} • ${t("admin.dashboard.shippingLabel")}`}
          meta={[
            {charset: "utf-8"}
          ]}
        />

        <section style={layoutStyles.section}>
          { /* header section */ }
          <DashboardHeader label={t("admin.dashboard.shippingLabel")} />

          { /* main section */ }
          <div className="container-fluid" style={styles.base}>
            <div className="row">
              {Boolean(shippingProviders && shippingProviders.length) ?
                shippingProviders.map(provider => (
                <Paper key={provider._id}>
                  <Table>
                    <TableHeader
                      displaySelectAll={false}
                      adjustForCheckbox={false}
                      // enableSelectAll={this.state.enableSelectAll}
                    >
                      <TableRow>
                        <TableHeaderColumn colSpan="3">
                          {provider.name}
                        </TableHeaderColumn>
                        <TableHeaderColumn colSpan="5" style={{ textAlign: "right" }}>
                          <FlatButton
                            label={t("controls.edit")}
                            onTouchTap={() => layoutSettingsActions.openSettings({
                              name: "EditShippingProvider",
                              payload: {
                                providerId: provider._id
                              }
                            })}
                          />
                          {/* Maybe it we don't need to remove provider this way */}
                          {/*<FlatButton
                            label={t("app.delete")}
                            onTouchTap={() => shippingActions.removeShippingProvider(provider._id)}
                          />*/}
                        </TableHeaderColumn>
                      </TableRow>
                      <TableRow>
                        <TableHeaderColumn>{t("shipping.name")}</TableHeaderColumn>
                        <TableHeaderColumn>{t("shipping.label")}</TableHeaderColumn>
                        <TableHeaderColumn>{t("shipping.group")}</TableHeaderColumn>
                        <TableHeaderColumn>{t("shipping.cost")}</TableHeaderColumn>
                        <TableHeaderColumn>{t("shipping.handling")}</TableHeaderColumn>
                        <TableHeaderColumn>{t("shipping.rate")}</TableHeaderColumn>
                        <TableHeaderColumn colSpan="2" style={{ textAlign: "right" }}>
                          <FlatButton
                            label={t("shipping.addShippingMethod")}
                            onTouchTap={() => layoutSettingsActions.openSettings({
                              name: "AddShippingMethod",
                              payload: {
                                providerId: provider._id
                              }
                            })}
                          />
                        </TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                      {Boolean(provider.methods && provider.methods.length) &&
                      provider.methods.map(method => (
                        <TableRow key={method._id}>
                          <TableRowColumn>{method.name}</TableRowColumn>
                          <TableRowColumn>{method.label}</TableRowColumn>
                          <TableRowColumn>{method.group}</TableRowColumn>
                          <TableRowColumn>{formatPrice(method.cost, locale)}</TableRowColumn>
                          <TableRowColumn>{formatPrice(method.handling, locale)}</TableRowColumn>
                          <TableRowColumn>{formatPrice(method.rate, locale)}</TableRowColumn>
                          <TableRowColumn>
                            {method.enabled ?
                              <ActionDone title={t("shipping.enabled")} /> :
                              <ContentClear title={t("shipping.disabled")} />
                            }
                          </TableRowColumn>
                          <TableRowColumn>
                            <IconButton
                              tooltip={t("shipping.edit")}
                              onTouchTap={() => layoutSettingsActions.openSettings({
                                name: "EditShippingMethod",
                                payload: {
                                  providerId: provider._id,
                                  methodId: method._id
                                }
                              })}
                            >
                              <ActionSettings />
                            </IconButton>
                            <IconButton
                              tooltip={t("shipping.delete")}
                              onTouchTap={() =>
                                shippingActions.deleteShippingMethod(provider._id, method)}
                            >
                              <ActionDeleteForever />
                            </IconButton>
                          </TableRowColumn>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              )) :
              <div>
                {t("shipping.noShippingMethods")}
                {"TODO: addShippingProvider"}
              </div>
              }
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Management.propTypes = {
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func
  }).isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  shippingActions: PropTypes.shape({
    deleteShippingMethod: PropTypes.func
    // removeShippingProvider: PropTypes.func
  }).isRequired,
  shippingProviders: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(Management);
