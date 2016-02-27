import React, { PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as accountsActions from "../../accounts/actions/accounts";
import Unauthorized from "../components/Unauthorized.jsx";

const UnauthorizedContainer = props => {
  return (
    <Unauthorized {...props} />
  );
};

UnauthorizedContainer.propTypes = {
  accountsActions: PropTypes.shape({
    login: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    accountsActions: bindActionCreators(accountsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnauthorizedContainer);
