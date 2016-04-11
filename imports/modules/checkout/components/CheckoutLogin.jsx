import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
// import { InlineLoginBox } from "{universe:accounts-ui}";
import CheckoutStepBadge from "./CheckoutStepBadge";
import CheckoutLoggedIn from "./CheckoutLoggedIn";
// import SignIn from "../../accounts/components/SignIn.jsx";
// import LoginForm from "../../accounts/components/LoginForm.jsx";
import Inline from "../../accounts/components/Inline.jsx";
import FlatButton from "material-ui/lib/flat-button";
import VerticalDivider from "../../layout/components/VerticalDivider.jsx";
import Header from "../../layout/components/Header.jsx";

const styles = {
  badge: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    backgroundColor: "#00dcdd",
    color: "#fff",
    fontSize: 16,
    fontWidth: "bold",
    marginRight: "1rem"
  },
  column: {
    padding: "2rem",
    display: "flex",
    justifyContent: "center"
  },
  continueAsGuest: {
    marginTop: "1rem",
    width: "100%"
  }
};

class CheckoutLogin extends Component {
  render() {
    const {
      checkoutStepCompleted, checkoutStep, badgeClass, iconClass, t,
      accountsActions, actionType, inlineActions, checkoutActions
      /*onClickContinueGuest*/
    } = this.props;
    const isLoginCompleted = checkoutStepCompleted(checkoutStep);
    const iconClassName = isLoginCompleted ? "green checkmark icon" :
      `${badgeClass} ${iconClass}`;

    console.log("CheckoutLogin...");
    return (
      <div>
        <Header
          label={isLoginCompleted ?
            t("checkoutLogin.loginCompleted") :
            t("checkoutLogin.guestOrLogin")}
          labelStyle={{ fontSize: 16, fontWidth: 300 }}
          style={{ minHeight: 50 }}
        >
          <i style={styles.badge}>{1}</i>
        </Header>
        
        {isLoginCompleted ? <CheckoutLoggedIn /> :
          <div>
            <div className="row" style={{ position: "relative" }}>
              <div className="col-xs-12 col-sm" style={styles.column}>
                <div className="ui basic segment">
                  <div style={{ textAlign: "justify" }}>
                    {t("checkoutLogin.guestMessage")}
                  </div>
                  <FlatButton
                    // fullWidth={true}
                    label={t("checkoutLogin.continueAsGuest")}
                    onTouchTap={checkoutActions.continueAsGuest}
                    style={styles.continueAsGuest}
                  />
                </div>
              </div>
              <VerticalDivider label={t("accountsUI.or")} />
              <div className="col-xs-12 col-sm" style={styles.column}>
                <Inline
                  accountsActions={accountsActions}
                  actionType={actionType}
                  inlineActions={inlineActions}
                />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

CheckoutLogin.propTypes = {
  accountsActions: PropTypes.shape({
    createUser: PropTypes.func,
    login: PropTypes.func,
    loginWithService: PropTypes.func,
    logout: PropTypes.func
  }).isRequired,
  actionType: PropTypes.string.isRequired,
  checkoutActions: PropTypes.shape({
    changeCartWorkflow: PropTypes.func,
    continueAsGuest: PropTypes.func
  }).isRequired,
  checkoutStepCompleted: PropTypes.func,
  checkoutStep: PropTypes.object.isRequired,
  badgeClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  inlineActions: PropTypes.shape({
    changeActionType: PropTypes.func,
    destroyInline: PropTypes.func
  }).isRequired,
  // onClickContinueGuest: PropTypes.func.isRequired
  t: PropTypes.func
};

export default translate("core")(CheckoutLogin);
