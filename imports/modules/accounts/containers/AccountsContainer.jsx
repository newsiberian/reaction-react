import React, { /*Component,*/ PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as alertActions from "../../layout/actions/alert";
import * as accountsActions from "../actions/accounts";
import { routeActions } from "react-router-redux";

const styles = {
  flex: "1 1 auto"
};

/**
 * @class AccountsContainer
 */
const AccountsContainer = props => {
  const children = React.cloneElement(props.children, {
    alertActions: props.alertActions,
    accountsActions: props.accountsActions,
    routeActions: props.routeActions,
    prevPath: props.location.state && props.location.state.prevPath || "/"
  });

  return <div style={styles}>{children}</div>;
};

AccountsContainer.propTypes = {
  accountsActions: PropTypes.shape({
    createUser: PropTypes.func,
    login: PropTypes.func,
    loginWithService: PropTypes.func,
    logout: PropTypes.func
  }).isRequired,
  alertActions: PropTypes.shape({
    displayAlert: PropTypes.func
  }).isRequired,
  routeActions: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    // pathname: state.routing.location.pathname
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertActions, dispatch),
    accountsActions: bindActionCreators(accountsActions, dispatch),
    routeActions: bindActionCreators(routeActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsContainer);
