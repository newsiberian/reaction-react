import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import Settings from "../components/shop/Settings.jsx";
import * as formsActions from "../actions/forms";
import * as settingsActions from "../actions/settings";
import * as layoutSettingsActions from "../../layout/actions/settings";

const ShopSettingsContainer = props => <Settings {...props} />;

ShopSettingsContainer.propTypes = {
  activeCard: PropTypes.string,
  formsActions: PropTypes.shape({
    submitForm: PropTypes.func
  }).isRequired,
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  settingsActions: PropTypes.shape({
    toggleCard: PropTypes.func
  }).isRequired,
  corePackageData: PropTypes.object,
  shopData: PropTypes.object
};

function mapStateToProps(state) {
  return {
    activeCard: state.dashboard.coreSettings.active
  };
}

function mapDispatchToProps(dispatch) {
  return {
    formsActions: bindActionCreators(formsActions, dispatch),
    settingsActions: bindActionCreators(settingsActions, dispatch),
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch)
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

    onData(null, {
      corePackageData,
      shopData
    });
  }
}

const ShopSettingsContainerWithData = composeWithTracker(
  composer
)(ShopSettingsContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopSettingsContainerWithData);
