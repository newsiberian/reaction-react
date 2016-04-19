import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import Settings from "../components/i18n/Settings.jsx";
import * as formsActions from "../actions/forms";
import * as layoutSettingsActions from "../../layout/actions/settings";
import * as i18nActions from "../actions/i18n";

const I18nSettingsContainer = props => <Settings {...props} />;

I18nSettingsContainer.propTypes = {
  formsActions: PropTypes.shape({
    submitForm: PropTypes.func
  }).isRequired,
  i18nActions: PropTypes.shape({
    toggleLanguage: PropTypes.func
  }).isRequired,
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  shopData: PropTypes.object
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    formsActions: bindActionCreators(formsActions, dispatch),
    i18nActions: bindActionCreators(i18nActions, dispatch),
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch)
  };
}

function composer(props, onData) {
  if (ReactionCore.Subscriptions.Shops.ready()) {
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

    onData(null, { shopData });
  }
}

const I18nSettingsContainerWithData = composeWithTracker(
  composer
)(I18nSettingsContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(I18nSettingsContainerWithData);
