import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as alertActions from "../../layout/actions/alert";
import * as formsActions from "../actions/forms";
import * as packagesActions from "../actions/packages";
import * as settingsActions from "../actions/settings";
import * as i18nActions from "../actions/i18n";
import { routeActions } from "react-router-redux";
import DashboardGrid from "../components/grid/DashboardGrid.jsx";
import getReactionApps from "../../../client/helpers/apps";

const DashboardGridContainer = props => <DashboardGrid {...props} />;

DashboardGridContainer.propTypes = {
  activeCard: PropTypes.string,
  alertActions: PropTypes.shape({
    displayAlert: PropTypes.func
  }).isRequired,
  formsActions: PropTypes.shape({
    submitForm: PropTypes.func
  }).isRequired,
  i18nActions: PropTypes.shape({
    toggleLanguage: PropTypes.func
  }).isRequired,
  packagesActions: PropTypes.shape({
    getPackages: PropTypes.func,
    togglePackage: PropTypes.func
  }).isRequired,
  settingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func,
    toggleCard: PropTypes.func
  }).isRequired,
  corePackageData: PropTypes.object, // for core settings action bar
  shopData: PropTypes.object, // for core settings action bar
  apps: PropTypes.array
};

function mapStateToProps(state) {
  return {
    //packages: state.dashboard.packages
    //pathname: state.routing.location.pathname
    activeCard: state.dashboard.coreSettings.active
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertActions, dispatch),
    formsActions: bindActionCreators(formsActions, dispatch),
    i18nActions: bindActionCreators(i18nActions, dispatch),
    packagesActions: bindActionCreators(packagesActions, dispatch),
    settingsActions: bindActionCreators(settingsActions, dispatch),
    routeActions: bindActionCreators(routeActions, dispatch)
  };
}

function composer(props, onData) {
  const { Shops, Packages } = ReactionCore.Subscriptions;
  if (Shops.ready() && Packages.ready()) {
    const corePackageData = ReactionCore.Collections.Packages.findOne({
      name: "core"
    }, {
      fields: {
        "settings.public.allowGuestCheckout": 1,
        "settings.mail": 1,
        "settings.openexchangerates": 1,
        "settings.google": 1
      }
    });
    const shopData = ReactionCore.Collections.Shops.findOne({}, {
      fields: {
        addressBook: 1,
        name: 1,
        emails: 1,
        description: 1,
        keywords: 1,
        timezone: 1,
        currency: 1,
        baseUOM: 1,
        language: 1,
        languages: 1,
        defaultPaymentMethod: 1
      }
    });
    const apps = getReactionApps({ provides: "dashboard" });

    onData(null, {
      corePackageData: corePackageData,
      shopData: shopData,
      apps: apps
    });
  }
}

const DashboardGridContainerWithData = composeWithTracker(
  composer
)(DashboardGridContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardGridContainerWithData);
