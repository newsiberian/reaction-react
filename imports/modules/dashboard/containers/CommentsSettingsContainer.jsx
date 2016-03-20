import React, { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import Settings from "../components/comments/Settings.jsx";
import * as formsActions from "../actions/forms";
import * as layoutSettingsActions from "../../layout/actions/settings";
//import * as i18nActions from "../actions/i18n";

const CommentsSettingsContainer = props => <Settings {...props} />;

CommentsSettingsContainer.propTypes = {
  commentsPackageData: PropTypes.shape({
    enabled: PropTypes.bool
  }),
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    // formsActions: bindActionCreators(formsActions, dispatch),
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch)
  };
}

function composer(props, onData) {
  if (ReactionCore.Subscriptions.Packages.ready()) {
    const shopId = ReactionCore.getShopId();
    const commentsPackageData = ReactionCore.Collections.Shops.findOne({
      name: "reaction-comments-core",
      shopId: shopId
    }, {
      fields: {
        "settings.moderation": 1
      }
    });

    onData(null, { commentsPackageData });
  }
}

const CommentsSettingsContainerWithData = composeWithTracker(
  composer
)(CommentsSettingsContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsSettingsContainerWithData);
