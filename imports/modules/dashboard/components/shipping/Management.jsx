import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { formatPrice } from "../../../client/helpers/i18n";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import { ActionDone, ActionDeleteForever, ActionSettings } from "material-ui/svg-icons/action";
import ContentClear from "material-ui/svg-icons/content/clear";
import DashboardHeader from "../DashboardHeader.jsx";
import Header from "../../../layout/components/Header.jsx";
import { layoutStyles } from "../../../layout/styles/layout";

const styles = {
  base: {
    paddingTop: "1rem",
    paddingBottom: "1rem"
  }
};

class Management extends Component {
  render() {
    const { shippingProviders, locale, t } = this.props;

    return (
      <div style={layoutStyles.parent}>
        <section style={layoutStyles.section}>
          { /* header section */ }
          <DashboardHeader label={t("admin.dashboard.commentsLabel")} />

          { /* main section */ }
          <div className="container-fluid" style={styles.base}>
            <div className="row">
              <div className="col-xs">
                {Boolean(shippingProviders && shippingProviders.length) ?
                  shippingProviders.map(provider => (
                  <Paper>
                    <Header />
                    <Table>
                      <TableHeader
                        // displaySelectAll={this.state.showCheckboxes}
                        // adjustForCheckbox={this.state.showCheckboxes}
                        // enableSelectAll={this.state.enableSelectAll}
                      >
                        <TableRow>
                          <TableHeaderColumn colSpan="2">
                            {provider.name}
                          </TableHeaderColumn>
                          <TableHeaderColumn>
                            <FlatButton
                              label={t("controls.edit")}
                              onTouchTap={() => layoutSettingsActions.openSettings({
                                name: "EditShippingProvider",
                                payload: {
                                  providerId: provider._id
                                }
                              })}
                            />
                          </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                          <TableHeaderColumn tooltip="The ID">{t("shipping.name")}</TableHeaderColumn>
                          <TableHeaderColumn tooltip="The Name">{t("shipping.label")}</TableHeaderColumn>
                          <TableHeaderColumn tooltip="The Status">{t("shipping.group")}</TableHeaderColumn>
                          <TableHeaderColumn tooltip="The Status">{t("shipping.cost")}</TableHeaderColumn>
                          <TableHeaderColumn tooltip="The Status">{t("shipping.handling")}</TableHeaderColumn>
                          <TableHeaderColumn tooltip="The Status">{t("shipping.rate")}</TableHeaderColumn>
                          <TableHeaderColumn tooltip="The Status">
                            <FlatButton
                              label={"shipping.addShippingMethod"}
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
                      <TableBody>
                        {Boolean(provider.methods && provider.methods.length) &&
                        provider.methods.map(method => (
                          <TableRow>
                            <TableRowColumn>method.name</TableRowColumn>
                            <TableRowColumn>method.label</TableRowColumn>
                            <TableRowColumn>method.group</TableRowColumn>
                            <TableRowColumn>formatPrice(method.cost, locale)</TableRowColumn>
                            <TableRowColumn>formatPrice(method.handling, locale)</TableRowColumn>
                            <TableRowColumn>formatPrice(method.rate, locale)</TableRowColumn>
                            <TableRowColumn>
                              {method.enabled ? <ActionDone /> : <ContentClear />}
                            </TableRowColumn>
                            <TableRowColumn>
                              <IconButton
                                tooltip={t("shipping.edit")}
                                onTouchTap={() => layoutSettingsActions.openSettings({
                                  name: "EditMethodProvider",
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
                                onTouchTap={() => shippingActions.deleteShippingMethod(method._id)}
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
              <div className="col-xs">
                {22222222222222222222}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Management.propTypes = {
  shippingActions: PropTypes.shape({
    deleteShippingMethod: PropTypes.func
  }).isRequired,
  shippingProviders: PropTypes.arrayOf(PropTypes.object),
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func
  }).isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(Management);
