import React, { Component, PropTypes } from "react";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TagsNav from "../components/TagsNav.jsx";
// import Loading from "../../layout/components/Loading.jsx";
import * as tagsActions from "../actions/tags";
import { push } from "react-router-redux";

// const TagsNavContainer = props => <TagsNav {...props} />;
class TagsNavContainer extends Component {
  componentWillUnmount() {
    // cleanup
    this.props.tagsActions.destroyTagsNav();
  }

  render() {
    debugger;
    return <TagsNav {...this.props} />;
  }
}

TagsNavContainer.propTypes = {
  nav: PropTypes.shape({
    editable: PropTypes.bool,
    opened: PropTypes.bool
  }).isRequired,
  push: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.object),
  tagsActions: PropTypes.shape({
    toggleTagsNav: PropTypes.func,
    destroyTagsNav: PropTypes.func,
    toggleEditMode: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {
    nav: state.tags.nav
  };
}

function mapDispatchToProps(dispatch) {
  return {
    push: bindActionCreators(push, dispatch),
    tagsActions: bindActionCreators(tagsActions, dispatch)
  };
}

function composer(props, onData) {
  if (ReactionCore.Subscriptions.Tags.ready()) {
    const tags = ReactionCore.Collections.Tags.find({
      isTopLevel: true
    }, {
      sort: {
        position: 1
      }
    }).fetch();
    onData(null, { tags });
  }
}

const TagsNavContainerWithData = composeWithTracker(
  composer
  // Loading
)(TagsNavContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsNavContainerWithData);

