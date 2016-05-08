import React, { PropTypes } from "react";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TagsNav from "../components/TagsNav.jsx";
// import Loading from "../../layout/components/Loading.jsx";
import * as tagsActions from "../actions/tags";

const TagsNavContainer = props => <TagsNav {...props} />;

TagsNavContainer.propTypes = {
  shippingActions: PropTypes.shape({
    updateShippingMethod: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    tagsActions: bindActionCreators(tagsActions, dispatch)
  };
}

function composer(props, onData) {

  onData(null, {});
}

const TagsNavContainerWithData = composeWithTracker(
  composer
  // Loading
)(TagsNavContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsNavContainerWithData);

