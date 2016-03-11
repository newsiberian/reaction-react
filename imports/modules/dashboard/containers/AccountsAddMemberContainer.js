import React, { PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as formsActions from "../actions/forms";
import * as layoutSettingsActions from "../../layout/actions/settings";
import AddMember from "../components/accounts/AddMember.jsx";

/**
 * @class AccountsAddMemberContainer
 * @classdesc
 */
const AccountsAddMemberContainer = props => (
  <AddMember
    submitAddMemberForm={props.formsActions.submitAddMemberForm}
    layoutSettingsActions={props.layoutSettingsActions}
  />
);


AccountsAddMemberContainer.propTypes = {
  formsActions: PropTypes.object.isRequired,
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
    formsActions: bindActionCreators(formsActions, dispatch),
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsAddMemberContainer);
